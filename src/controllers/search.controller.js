import { findCompanyByName } from "../services/company.service.js";
import { findCvsByJobPosition } from "../services/cv.service.js";

export const searchByName = async (req, res) => {
  try {
    const { companyName } = req.params;
    console.log(companyName);

    if (!companyName) {
      return res.status(400).json({ error: "Company Name is required" });
    }

    const comanys = await findCompanyByName(companyName);
    res.status(200).json(comanys);
  } catch (error) {
    console.error("Error searching for Companies by Name:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for companies" });
  }
};

export const searchByJobPosition = async (req, res) => {
  try {
    const { job_position } = req.params;

    if (!job_position) {
      return res.status(400).json({ error: "Job position is required" });
    }

    const cvs = await findCvsByJobPosition(job_position);
    res.status(200).json(cvs);
  } catch (error) {
    console.error("Error searching for CVs by job position:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for CVs" });
  }
};
