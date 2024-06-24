export default {
  api: `/api/${process.env.API_VERSION || "v1"}`,

  user: {
    getById: "/users/:id",
    signin: "/user/signin",
    signup: "/user/signup",
    resetpassword: "/user/reset-password",
    showAllUser: "/user/showAllUser",
  },

  company: {
    signin: "/company/signin",
    signup: "/company/signup",
    showAll: "/company/showAll",
  },

  cv: {
    getAll: "/cv/all",
    getById: "/cv/:id",
    create: "/cv/create",
    update: "/cv/update/:id",
    delete: "/cv/delete/:id",
  },
};
