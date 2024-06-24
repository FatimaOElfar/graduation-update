export default {
  api: `/api/${process.env.API_VERSION || "v1"}`,

  user: {
    getById: "/user",
    signin: "/user/signin",
    signup: "/user/signup",
    resetpassword: "/user/reset-password",
  },

  company: {
    signin: "/company/signin",
    signup: "/company/signup",
  },

  cv: {
    getAll: "/cv/all",
    getById: "/cv/:id",
    create: "/cv/create",
    update: "/cv/update/:id",
    delete: "/cv/delete/:id",
  },
};
