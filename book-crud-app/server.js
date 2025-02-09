const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const controller = require("./controller/controller");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const role = require("./middleware/role");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
db.connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow CRUD operations
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Apply authentication middleware to all other routes
// app.use(auth);

// Controller routes
app.use("/", controller);

// Role-based authorization example
app.get("/api/admin", role("admin"), (req, res) => {
  res.json({ message: "This is an admin-only route", user: req.user });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Swagger UI (exclude from authentication)
const specs = swaggerJsdoc(swaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
