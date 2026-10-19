import express from "express";
import { getUsers } from "../controllers/users.controller.js";
import { requireAuth } from "../midllewares/auth.middlewares.js";

const router = express.Router();

// GET /users - Protected endpoint returning all registered users (name + email)
router.get("/", requireAuth, getUsers);

export default router;
