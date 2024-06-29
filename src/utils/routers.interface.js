export default {
  api: `/api/${process.env.API_VERSION || "v1"}`,

  images: {
    get: "/images/:filename",
  },

  //http://localhost:3000/api/v1/user/signin
  user: {
    getById: "/users/:id",
    signin: "/users/signin",
    signup: "/users/signup",
    resetpassword: "/users/reset-password",
  },

  company: {
    signin: "/company/signin",
    signup: "/company/signup",
    showAll: "/companys",
    getById: "/companys/:id",
  },

  cv: {
    getAll: "/cvs",
    getById: "/cvs/:id",
    create: "/cvs",
    update: "/cvs/:id",
    delete: "/cvs/:id",
  },
  // RESTFULL_WAY: {
  //   getAll: "/cvs",
  //   getById: "/cvs/:id",
  //   create: "/cvs", // POST
  //   update: "/cvs", // PUT
  //   delete: "/cvs/:id", // DELETE
  // },
};
