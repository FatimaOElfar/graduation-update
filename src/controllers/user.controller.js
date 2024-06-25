import {
  getUserByUsername,
  createNewUser,
  getUserByEmail,
  updateUserPassword,
  getUserById,
  getAllUser,
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
  const { password, email } = req.body;

  try {
    const user = await getUserByUsername(email);
    if (user) {
      return res.status(400).json({ message: "User already exists", error: 1 });
    }

    req.body.password = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(req.body);
    return res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("-----error----", error);
    return res.status(500).send("Internal server error");
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required", error: 1 });
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", error: 1 });
    }

    delete user.entity;
    delete user.password;
    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).send("Internal server error");
  }
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

export const showAllUser = async (req, res) => {
  try {
    const user = await getAllUser();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send("Internal server error");
  }
};
