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
          username: company.username,
          hashed_password: company.password,
        },
      },
    },
  });
};

export const getCompanyByCompanyName = async (companyName) => {
  return await prisma.companyName.findFirst({
    where: { entity: { companyName } },
    include: { entity: true },
  });
};
