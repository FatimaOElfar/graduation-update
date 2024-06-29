import {
  createNewCompany,
  getAllCompanies,
  getCompanyByEmailTIN,
} from "../services/company.service.js";
import bcrypt from "bcrypt";

export const signUpCompany = async (req, res) => {
  const { TIN, password, email } = req.body;

  try {
    // Check if the user already exists
    const company = await getCompanyByEmailTIN(email, TIN);
    if (company) {
      return res
        .status(201)
        .json({ message: "Company already exists", error: 1 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    req.body.image = req.file.filename;
    const newCompany = await createNewCompany({
      ...req.body,
      password: hashedPassword,
    });

    // Respond with success message
    delete newCompany.entityId;
    delete newCompany.metadata;
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
  const company = await getCompanyByEmailTIN(email, TIN);
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
  delete company.metadata;
  return res.status(200).json({ message: "Company signed in successfully" });
};
export const showAll = async (req, res) => {
  try {
    var companies = await getAllCompanies();
    return res.status(200).json({
      message: "Successfully fetched all companies",
      data: [...companies],
    });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res.status(500).send("Internal server error");
  }
};

export const getById = async (req, res) => {};
