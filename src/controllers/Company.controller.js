import {
  createNewCompany,
  getCompanyByCompanyName,
} from "../services/company.service.js";
import bcrypt from "bcrypt";

export const signUpCompany = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const company = await getCompanyByCompanyName(username);
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exists", error: 1 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newCompany = await createNewCompany({
      username,
      password: hashedPassword,
    });

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error("-----error----", error);
    return res.status(500).send("Internal server error");
  }
};
export const signInCompany = async (req, res) => {};
