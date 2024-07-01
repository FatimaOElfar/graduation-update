import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.json({ message: "Authentication token not found", error: 1 });

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, entity) => {
    if (err) return res.json({ message: "Authentication failed", error: 1 });

    req.entity = entity;
    next();
  });
};

export const authenticateWithTokenParam = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Verification link not valid", error: 1 });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, entity) => {
    if (err)
      return res.json({
        message: "Verification link not authorized",
        error: 1,
      });

    req.entity = entity;
    next();
  });
};

export const generateAccessToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1800s",
  });
};
