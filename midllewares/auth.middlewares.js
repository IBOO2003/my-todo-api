import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Authentication required. Format must be: Bearer <token>",
    });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      message: "Authentication token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const dateInMiliseconds = new Date().getTime();
    // check if the token is expired
    if (dateInMiliseconds > decoded.exp * 1000) {
      return res.status(401).json({
        message: "Token expired",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
