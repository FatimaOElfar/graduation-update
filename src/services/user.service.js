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
