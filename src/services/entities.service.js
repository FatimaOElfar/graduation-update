import { prisma } from "../db/prisma.init.js";

export const getEntityByEmail = async (email) => {
  return await prisma.entity.findUnique({
    where: {
      email,
    },
  });
};

export const updateEntityOTP = async (entityId, OTP) => {
  return await prisma.entity.update({
    where: { id: entityId },
    data: {
      OTP,
      OTP_created_at: new Date(),
    },
  });
};

export const updateEntityPassword = async (entityId, hashedPassword) => {
  return await prisma.entity.update({
    where: { id: entityId },
    data: {
      hashed_password: hashedPassword,
    },
  });
};
