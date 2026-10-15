import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateRegister } from "../midllewares/authValidation.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
