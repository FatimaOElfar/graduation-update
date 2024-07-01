import { getCompaniesByName } from "../services/company.service.js";
import { getCvsByJobPosition } from "../services/cv.service.js";

export const searchCompaniesByCompanyName = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: "Search prompt is required" });
    }

    const companies = await getCompaniesByName(search);
    res.status(200).json({
      message: `Searched for all companies that start with: ${search}`,
      data: companies,
    });
  } catch (error) {
    console.error("Error searching for Companies by Name:", error);
    res.status(500).json({
      message: "An error occurred while searching for companies",
      error: 1,
    });
  }
};

export const searchByJobPosition = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: "Job position is required" });
    }

    const cvs = await getCvsByJobPosition(search);
    res.status(200).json({
      message: `Searched for all CVs that have the job position: ${search}`,
      data: cvs,
    });
  } catch (error) {
    console.error("Error searching for CVs by job position:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for CVs" });
  }
};
