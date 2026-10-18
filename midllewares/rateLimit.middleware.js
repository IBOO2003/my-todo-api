import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const clientIp = req.headers["x-real-ip"];

    if (typeof clientIp !== "string" || !clientIp) {
      throw new Error("Missing Railway X-Real-IP header");
    }

    return ipKeyGenerator(clientIp);
  },
  message: {
    message: "Too many requests from this, please try again after 10 minutes",
  },
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const clientIp = req.headers["x-real-ip"];

    if (typeof clientIp !== "string" || !clientIp) {
      throw new Error("Missing Railway X-Real-IP header");
    }

    return ipKeyGenerator(clientIp);
  },
  message: {
    message: "Too many login attempts, please try agian after 10 minutes",
  },
});
