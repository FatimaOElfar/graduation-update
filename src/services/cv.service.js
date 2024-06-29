import { prisma } from "../db/prisma.init.js";

export const createCv = async (userId) => {
  return await prisma.user.create({
    data: {
      metadata: {},
      profile: {
        declaration: {
          description: cv.description,
          date: cv.date,
          place: cv.place,
        },
        careerObjective: {
          description: cv.description,
          experience: cv.experience,
        },
        reference: {
          referenceName: cv.referenceName,
          designation: cv.designation,
          organization: cv.organization,
        },
        techSkills: {},
        education: {
          course: cv.course,
          collage: cv.collage,
          GPA: cv.GPA,
          yearOfPass: cv.yearOfPass,
        },
        personalDetails: {
          DOB: cv.DOB,
          maritalStatus: cv.maritalStatus,
          language: cv.language,
          nationality: cv.nationality,
        },
        projects: {
          projectTitle: cv.projectTitle,
          technologies: cv.technologies,
          roles: cv.roles,
          tech: cv.tech,
          projectDescription: cv.projectDescription,
        },
        resumaWorkSpace: {
          Name: cv.Name,
          email: cv.email,
          phone: cv.phone,
          address: cv.address,
          addLine2: cv.addLine2,
          addLine3: cv.addLine3,
        },
        hobbies: {},
        experience: {
          companyName: cv.companyName,
          collage: cv.collage,
          roles: cv.roles,
          employStatus: cv.employStatus,
          dateJoined: cv.dateJoined,
        },
        achievement: {},
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
