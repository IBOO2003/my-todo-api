import { db } from "../db.js"; //
import { users } from "../src/schema.js";

export async function getAllUserEmails() {
  const result = await db
    .select({
      email: users.email,
    })
    .from(users);

  return result;
}
