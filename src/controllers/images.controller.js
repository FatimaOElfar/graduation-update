import path from "path";
import fs from 'fs'

export const getImage = async (req, res) => {
    console.log(req.params.filename)
  const imagePath = path.join(process.cwd(), `/upload/${req.params.filename}`);
  return fs.existsSync(imagePath) ? res.sendFile(imagePath) : res.json({message: "Image not found.", error: 1})
};
