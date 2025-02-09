// const swaggerJsdoc = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const Book = require("./model/book");
const User = require("./model/user");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Book CRUD App API",
      version: "1.0.0",
      description: "API documentation for the Book CRUD App",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Book: m2s(Book),
        User: m2s(User),
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Specify JWT as the format
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Apply bearer authentication globally
      },
    ],
  },
  apis: ["./controller/*.js", "./routes/*.js"],
};

module.exports = options;
