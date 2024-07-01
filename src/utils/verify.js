import nodemailer from "nodemailer";

import Logger from "./logger.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = async (email, otp) => {
  Logger.log(`Sending email to ${email} with otp: ${otp}`);
  await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: `${process.env.PROJECT} | Reset Password`,
    text: `This is the OTP code to reset your password: ${otp}`,
  });
};
