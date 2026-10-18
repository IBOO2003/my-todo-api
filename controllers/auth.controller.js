import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || name === undefined || typeof name !== String) {
      return res.status(400).json({
        message: "name can not be empty or non-string values",
      });
    }
    const user = await registerUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    if (!user) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(err);
  }
}

//login <<<<<>>>>>

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
      email: email.trim().toLowerCase(),
      password,
    });

    if (result.error) {
      return res.status(result.status).json({
        message: result.error,
      });
    }
    return res.status(200).json({
      message: "Logged in successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(err);
  }
}
