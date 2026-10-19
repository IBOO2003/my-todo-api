import { db } from "../db.js"; //
import { users } from "../src/schema.js";

export async function getAllUserEmails() {
  const result = await db
    .select({
      name: users.username,
      email: users.email,
    })
    .from(users);

  return result;
}
