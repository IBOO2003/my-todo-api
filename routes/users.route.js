import express from "express";
import { getUserEmails } from "../controllers/todo.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/emails", verifyToken, getUserEmails);

export default router;
