import {
  createCv,
  deleteCVByUserId,
  getCVByUserId,
  updateCVByUserId,
} from "../services/cv.service.js";
import { getUserByIdAndCV } from "../services/user.service.js";

export const createCV = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await getUserByIdAndCV(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found", error: 1 });
    }

    if (user.cv) {
      return res
        .status(402)
        .json({ message: "This user does already have a CV", error: 1 });
    }

    const createdCV = await createCv(req.body);

    res
      .status(201)
      .json({ message: "CV created successfully", data: createdCV });
  } catch (error) {
    console.error("Error creating CV:", error);
    res
      .status(500)
      .json({ message: "Failed to create CV", error: error.message });
  }
};

export const deleteCV = async (req, res) => {
  const { id } = req.params;

  const user = await getUserByIdAndCV(id);
  if (!user) {
    return res.status(401).json({ message: "User not found", error: 1 });
  }

  if (!user.cv) {
    return res.status(401).json({ message: "Cv not found", error: 1 });
  }

  await deleteCVByUserId(id);

  res
    .status(200)
    .json({ message: `CV of user '${id}' was deleted.`, success: 1 });
};
export const getCV = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdAndCV(id);

    if (!user) {
      return res.status(401).json({ message: "User not found", error: 1 });
    }

    if (!user.cv) {
      return res
        .status(401)
        .json({ message: "Cv not found for this user", error: 1 });
    }
    const cv = user.cv;
    res.status(200).json({ message: "CV fetched successfully", data: cv });
  } catch (error) {
    console.error("Error fetching CV:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch CV", error: error.message });
  }
};

export const updateCV = async (req, res) => {
  const { id } = req.params;

  const user = await getUserByIdAndCV(id);
  if (!user) {
    return res.status(401).json({ message: "User not found", error: 1 });
  }
  if (!user.cv) {
    return res.status(401).json({ message: "Cv not found", error: 1 });
  }
  const updatedCV = await updateCVByUserId(req.body);
  res.status(200).json({ message: "CV updated successfully" });
};
