import { getUserByUsername, createNewUser } from "../services/user.service.js";
import bcrypt from "bcrypt";
export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user || !user?.entity) {
    return res.status(400).json({ message: "User not found", error: 1 });
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
  return res.status(200).json({ message: "User signed in successfully", user });
};
export const signUp = async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    state,
    city,
    gender,
    birthDate,
  } = req.body;

  try {
    // Check if the user already exists
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: "User already exists", error: 1 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createNewUser({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      state,
      city,
      gender,
      birthDate,
    });

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
