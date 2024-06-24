import { prisma } from "../db/prisma.init.js";

export const createNewUser = async (user) => {
  return await prisma.user.create({
    data: {
      metadata: {},
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        state: user.state,
        city: user.city,
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

export const getUserByUsername = async (username) => {
  return await prisma.user.findFirst({
    where: { entity: { username } },
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
  return await prisma.user.findUnique({
    where: { id },
    include: { entity: true },
  });
};
