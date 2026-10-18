import jwt from "jsonwebtoken";
export function requireAuth(req, res, next) {
  const authHeader = req.header("Authorization");
  //bug here

  if (
    !authHeader ||
    !authHeader.split(" ")[0] === "Bearer" ||
    !authHeader.split("")[1]
  ) {
    return res.status(401).json({
      message: "Invalid or expired Token.",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired Token.",
    });
  }
}
