import { prisma } from "../db/prisma.init.js";
export const createNewCompany = async (company) => {
  return await prisma.company.create({
    data: {
      metadata: {},
      profile: {
        companyName: company.companyName,
        password: company.password,
        confirmPassword: company.confirmPassword,
        email: company.email,
        phoneNumber: company.phoneNumber,
        address: company.address,
        TIN: company.TIN,
        yearOfEstablish: company.yearOfEstablish,
        description: company.description,
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
export const getAllCompanies = async () => {
  return await prisma.company.findMany({
    include: {
      entity: true,
    },
  });
};
// export const getCompanyByTIN = async (TIN,email) => {
//   return await prisma.company.findFirst({
//     where: { entity: { TIN } },
//     include: { entity: true },
//   });
// };
