// export const getDomain = () =>
//   (process.env.DOMAIN || "").replace("{port}", process.env.PORT);

export const getRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const checkIfOTPExpired = (otpCreatedAt) => {
  const otpExpiryTime = parseInt(process.env.OTP_EXPIRATION || "300");
  return otpExpiryTime > new Date() - new Date(otpCreatedAt);
};
