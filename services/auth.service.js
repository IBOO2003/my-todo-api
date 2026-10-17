// communicates with postgreSQL and handles account operation
import { db } from "../db.js";
import { users } from "../src/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register function
export async function registerUser(userData) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email));

    if (existingUser.length > 0) {
      return null;
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);
    console.log(userData);
    const result = await db
      .insert(users)
      .values({
        username: userData.name,
        email: userData.email,
        passwordHash,
      })
      .returning();
    const newUser = result[0];
    if (newUser) {
      delete newUser.passwordHash;
    }

    return newUser;
  } catch (error) {
    console.error("Database error in registerUser:", error);
    throw error;
  }
}

//login function
export async function loginUser(credentials) {
  const foundUser = await db
    .select()
    .from(users)
    .where(eq(users.email, credentials.email));

  if (foundUser.length === 0) {
    return {
      error: "Invalid email or password",
      status: 401,
    };
  }
  const user = foundUser[0];
  const isPassValid = await bcrypt.compare(
    credentials.password,
    user.passwordHash,
  );

  if (!isPassValid) {
    return {
      error: "Invalid email or password",
      status: 401,
    };
  }


  
  // creating a token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );


  // returnuing both (user + token)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
