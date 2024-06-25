import { prisma } from "../db/prisma.init.js";

export const createNewUser = async (user) => {
  return await prisma.user.create({
    data: {
      metadata: {},
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,

        gender: user.gender,
        birthDate: user.birthDate,
      },
      entity: {
        create: {
          email: user.email,
          username: user.username,
          hashed_password: user.password,
        },
      },
    },
  });
};

export const getUserByUsername = async (email) => {
  return await prisma.user.findFirst({
    where: { entity: { email } },
    include: { entity: true },
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: { entity: { email } },
    include: { entity: true },
  });
};

export const updateUserPassword = async (userId, hashedPassword) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      entity: {
        update: {
          hashed_password: hashedPassword,
        },
      },
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAllUser = async () => {
  return await prisma.user.findMany({
    include: {
      entity: true,
    },
  });
};
