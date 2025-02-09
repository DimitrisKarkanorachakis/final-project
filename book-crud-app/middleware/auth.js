const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Log the Authorization header for debugging
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authentication failed: No token provided or invalid format.");
    return res.status(401).json({ error: "Authentication failed. Please log in." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  // Log the extracted token for debugging
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User authenticated:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);

    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token. Please log in.";
    res.status(401).json({ error: errorMessage });
  }
};