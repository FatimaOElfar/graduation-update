import {
  createNewUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  getUserByEmailPassword,
} from "../services/user.service.js";
import { generateAccessToken } from "../middlewares/authenticate.js";
import bcrypt from "bcrypt";
import { redis } from "../db/redis.js";
export const signIn = async (req, res) => {
  const { password, email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
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
  delete user.metadata;
  return res.status(200).json({ message: "User signed in successfully" });
};

export const signUp = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user) {
      return res.status(201).json({ message: "User already exists", error: 1 });
    }

    req.body.password = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(req.body);
    newUser.profile.birthDate = parseInt(
      new Date(newUser.profile.birthDate).getTime() + ""
    );

    delete newUser.entity;
    delete newUser.entityId;
    delete newUser.metadata;

    const token = generateAccessToken(req.body);

    return res.status(200).json({
      message: `User created successfully.`,
      token,
      user: newUser,
    });
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

    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).send("Internal server error");
  }
};

export const showAllUser = async (req, res) => {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send("Internal server error");
  }
};

export const signUpForApps = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await getUserByEmailPassword(email, password);

    if (user) {
      return res.status(201).json({ message: "User already exists", error: 1 });
    }

    req.body.password = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(req.body);

    delete newUser.entity;
    delete newUser.entityId;
    delete newUser.metadata;
    return res

      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("-----error----", error);
    return res.status(500).send("Internal server error");
  }
};
