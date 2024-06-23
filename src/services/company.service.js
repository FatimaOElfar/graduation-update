import { prisma } from "../db/prisma.init.js";
export const createNewCompany = async (company) => {
  return await prisma.company.create({
    data: {
      metadata: {},
      profile: {
        companyName: company.companyName,
        password: company.password,
        email: company.email,
        phoneNumber: company.phoneNumber,
        address: company.address,
        TIN: company.TIN,
        yearOfEstablish: company.yearOfEstablish,
        website: company.website,
        companySize: company.companySize,
      },
      entity: {
        create: {
          email: company.email,
          username: company.companyName,
          hashed_password: company.password,
        },
      },
    },
  });
};

export const getCompanyByCompanyName = async (companyName) => {
  return await prisma.company.findFirst({
    where: { entity: { username: companyName } },
    include: { entity: true },
  });
};

export const getCompanyByEmail = async (email) => {
  return await prisma.company.findFirst({
    where: { entity: { email } },
    include: { entity: true },
  });
};
