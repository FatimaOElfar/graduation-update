import {
  updateEntityOTP,
  updateEntityPassword,
  getEntityByEmail,
} from "../services/entities.service.js";
import { getRandomOTP, checkIfOTPExpired } from "../utils/helpers.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/verify.js";
// export const verifyEntity = async (req, res) => {
//   const { entity } = req;
//   if (!entity) {
//     return res.json({ message: "Entity not found", error: 1 });
//   }
//   const newUser = await createNewUser(req.body);
//   newUser.profile.birthDate = parseInt(
//     new Date(newUser.profile.birthDate).getTime() + ""
//   );
//   return res.json({ message: "Entity verified", error: 0 });
// };

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required", error: 1 });
  }

  try {
    const entity = await getEntityByEmail(email);
    if (!entity) {
      return res.status(400).json({ message: "Email not found", error: 1 });
    }
    const otp = getRandomOTP();
    await updateEntityOTP(entity.id, otp);
    await sendEmail(email, otp);

    return res
      .status(200)
      .json({ message: `OTP sent successfully to ${email}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).send("Internal server error");
  }
};

export const resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword, OTP } = req.body;
  if (!email || !oldPassword || !newPassword || !OTP) {
    return res.status(400).json({
      message:
        "Email, old password, new password and the correct OTP are required",
      error: 1,
    });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({
      message: "Old password and new password cannot be the same",
      error: 1,
    });
  }

  try {
    const entity = await getEntityByEmail(email);
    if (!entity) {
      return res.status(400).json({ message: "Email not found", error: 1 });
    }
    console.log(req.body, entity);
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      entity?.hashed_password
    );

    if (!isOldPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password is incorrect", error: 1 });
    }

    if (!entity.OTP) {
      return res.status(400).json({ message: "OTP not sent", error: 1 });
    }

    if (checkIfOTPExpired(entity.OTP_created_at)) {
      return res.status(400).json({ message: "OTP was expired", error: 1 });
    }

    if (OTP != entity.OTP) {
      return res.status(400).json({ message: "Invalid OTP", error: 1 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateEntityPassword(entity.id, hashedPassword);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send("Internal server error");
  }
};
