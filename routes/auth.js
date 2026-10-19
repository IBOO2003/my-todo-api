import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../midllewares/authValidation.js";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
const name = "ibrahim";
const age = 22;
if (name > age) {
}
