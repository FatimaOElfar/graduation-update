import { prisma } from "../db/prisma.init.js";

export const createCv = async (userId) => {
  return await prisma.user.create({
    data: {
      metadata: {},
      profile: {
        graduationYear: cv.graduationYear,
        displayName: cv.displayName,
        contactInformation: {
          phone: cv.phone,
          whatsapp: cv.whatsapp,
          email: cv.email,
        },
        personalStatement: {
          name: cv.name,
          age: cv.age,
          dateOfBirth: cv.dateOfBirth,
          profilePhoto: cv.profilePhoto,
        },
        workExperience: {},
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
