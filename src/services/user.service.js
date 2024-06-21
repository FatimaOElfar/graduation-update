import { prisma } from "../db/prisma.init.js";

export const createNewUser = async (user) => {
  return await prisma.user.create({ data: user });
};

export const getUserByUsername = async (username) => {
  return await prisma.user.findFirst({ where: { entity: { username } } });
};
