import {
  getUserByUsername,
  createNewUser,
  getUserByEmail,
  updateUserPassword,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
export const signIn = async (req, res) => {
  const { password, email } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !user?.entity) {
    return res.status(400).json({ message: "Email not found", error: 1 });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user?.entity?.hashed_password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password", error: 1 });
  }

  delete user.entity;
  delete user.entityId;
  return res.status(200).json({ message: "User signed in successfully" });
};
export const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: "User already exists", error: 1 });
    }

    // Hash the password
    req.body.password = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createNewUser(req.body);

    // Respond with success message
    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("-----error----", error);
    return res.status(500).send("Internal server error");
  }
};

export const getById = async (req, res) => {
  return res.send("test getById");
};
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required", error: 1 });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user || !user.entity) {
      return res.status(400).json({ message: "Email not found", error: 1 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send("Internal server error");
  }
};
