import express from "express";
import { getUsersEmails } from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/emails", verifyToken, getUsersEmails);

export default router;
