import { prisma } from "../db/prisma.init.js";

export const createNewUser = async (user) => {
  return await prisma.user.create({
    data: {
      metadata: {},
      profile: {
        firstName: "First",
        lastName: "Last",
        email: "email@example.com",
        address: "address",
        phoneNumber: "phoneNumber",
        state: "state",
        city: "city",
        gender: "gender",
        birthDate: new Date("2024-06-22T19:26:23.761Z"),
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
