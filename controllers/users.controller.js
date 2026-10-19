import { getAllUserEmails } from "../services/users.service.js";

export async function getUsers(req, res) {
  try {
    const users = await getAllUserEmails();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
