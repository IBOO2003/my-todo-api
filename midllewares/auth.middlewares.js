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

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication token missing.",
      code: "NO_TOKEN",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name == "NotBeforeError") {
      return res.status(401).json({
        message: "Token is not active yet",
        code: "TOKEN_NOT_ACTIVE_YET",
      });
    }
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token is expierd ",
        code: "TOKEN_IS_EXPIRED",
      });
    }
    if ((error.name = "JsonWebTokenError")) {
      return res.status(401).json({
        message: "Invalid Token ",
        code: "TOKEN_IS_NOT_VALID",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
