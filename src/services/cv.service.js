import { prisma } from "../db/prisma.init.js";

export const createCv = async ({ userId, job_position, ...cv }) => {
  return await prisma.cv.create({
    data: {
      job_position: job_position,
      metadata: cv || {},
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const deleteCVByUserId = async (userId) => {
  await prisma.cv.delete({
    where: {
      userId,
    },
  });
};
export const getCVByUserId = async (userId) => {
  return await prisma.cv.findUnique({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });
};

export const updateCVByUserId = async (userId, cv) => {
  return await prisma.cv.update({
    where: {
      userId,
    },
    data: cv,
  });
};
