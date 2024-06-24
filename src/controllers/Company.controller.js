import {
  createNewCompany,
  getCompanyByCompanyName,
  getCompanyByEmail,
  getAllCompanies,
} from "../services/company.service.js";
import bcrypt from "bcrypt";

export const signUpCompany = async (req, res) => {
  const {
    username,
    password: hashedPassword,
    companyName,
    password,
    email,
    phoneNumber,
    address,
    TIN,
    yearOfEstablish,
    confirmPassword,
    description,
    companySize,
  } = req.body;

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
      companyName,
      email,
      phoneNumber,
      address,
      TIN,
      yearOfEstablish,
      confirmPassword,
      description,
      companySize,
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
export const signInCompany = async (req, res) => {
  const { email, password, TIN } = req.body;
  const company = await getCompanyEmail(email);
  if (!company || !company?.entity) {
    return res.status(400).json({ message: "Company not found", error: 1 });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    company?.entity?.hashed_password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password", error: 1 });
  }
  delete company.entity;
  delete company.entityId;
  return res.status(200).json({ message: "Company signed in successfully" });
};
export const showAll = async (req, res) => {
  try {
    const companies = await getAllCompanies();
    return res.status(200).json(companies);
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res.status(500).send("Internal server error");
  }
};
