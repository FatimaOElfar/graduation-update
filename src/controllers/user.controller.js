export const signIn = async (req, res) => {
  console.log(req.body);
  return res.send("test signIn");
};
export const signUp = async (req, res) => {
  console.log(req.body);
  return res.send("test signUp");
};

export const getById = async (req, res) => {
  return res.send("test getById");
};
