module.exports = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    if (!requiredRoles.includes(req.user.role)) {
      console.warn(
        `Unauthorized access attempt: User ${req.user.id} with role ${req.user.role}`
      );
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }
 
    next();
  };
};
