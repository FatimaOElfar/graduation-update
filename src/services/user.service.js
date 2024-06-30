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
        birthDate: new Date(user.birthDate).getTime(),
      },
      entity: {
        create: {
          email: user.email,
          hashed_password: user.password,
        },
      },
    },
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

export const getUserById = async (id, include) => {
  if (!id) return null;
  return await prisma.user.findUnique({
    where: { id },
    include: { entity: false },
  });
};

export const getUserByIdAndCV = async (id) => {
  if (!id) return null;
  return await prisma.user.findUnique({
    where: { id },
    include: { entity: false, cv: true },
  });
};

export const getAllUser = async () => {
  return await prisma.user.findMany({
    include: {
      entity: false,
    },
  });
};

export const getUserByEmailPassword = async (email, hashed_password) => {
  return await prisma.user.findFirst({
    where: { entity: { email, hashed_password } },
    include: { entity: true },
  });
};
