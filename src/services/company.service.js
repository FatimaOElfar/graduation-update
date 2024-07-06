import { prisma } from "../db/prisma.init.js";
export const createNewCompany = async (company) => {
  return await prisma.company.create({
    data: {
      metadata: {},
      companyName: company.companyName,
      profile: {
        companyName: company.companyName,
        email: company.email,
        phoneNumber: company.phoneNumber,
        address: company.address,
        TIN: company.TIN,
        yearOfEstablish: company.yearOfEstablish,
        description: company.description,
        companySize: company.companySize,
        image: company.image,
      },
      entity: {
        create: {
          email: company.email,
          hashed_password: company.password,
          TIN: company.TIN,
        },
      },
    },
  });
};

export const getCompanyByEmailTIN = async (email, TIN) => {
  return await prisma.company.findFirst({
    where: { entity: { email, TIN } },
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
  return await prisma.company.findMany();
};

export const getCompanyById = async (id, include) => {
  if (!id) return null;
  return await prisma.company.findUnique({
    where: { id },
    include: { entity: false },
  });
};
export const getCompaniesByName = async (companyName) => {
  const companies = await prisma.company.findMany({
    where: {
      companyName: {
        contains: companyName,
      },
    },
  });

  return companies;
};
