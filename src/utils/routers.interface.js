export default {
  api: `/api/${process.env.API_VERSION || "v1"}`,

  images: {
    get: "/images/:filename",
  },

  entity: {
    sendOTP: "/entities/send-otp",
    resetpassword: "/entities/reset-password",
    verifyEmail: "/entities/verify-email/:token",
  },

  user: {
    getById: "/users/:id",
    login: "/users/login",
    register: "/users/register",
    showAllUser: "/users",
    signupApp: "/users",
  },

  company: {
    login: "/companies/login",
    register: "/companies/register",
    showAll: "/companies",
    getById: "/companies/:id",
  },

  cv: {
    getAll: "/cvs",
    getById: "/cvs/:id",
    create: "/cvs",
    update: "/cvs/:id",
    delete: "/cvs/:id",
  },
  search: {
    user: "/user",
    company: "/company",
    position: "/job",
  },
};
