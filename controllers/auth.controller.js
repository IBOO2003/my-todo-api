import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, Email, and password are required",
      });
    }
    const cleanEmail = email.trim().toLocaleLowerCase();

    if (!cleanEmail.endsWith("@gs.com")) {
      return res.status(400).json({
        message: "the email must end with @gs.com only",
      });
    }

    const user = await registerUser({
      name: name.trim(),
      email: cleanEmail,
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
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}

//login <<<<<>>>>>

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

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
    console.error("Login error", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}
