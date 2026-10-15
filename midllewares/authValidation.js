import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("please provide a valid email")
    .matches(/^[A-Za-z0-9._%+-]+@gs\.com$/)
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("password must contain at least one number")
    .matches(/[\w_]/)
    .withMessage("password must contain at least one special character")
    .notEmpty()
    .withMessage("password cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
