import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  signIn,
  getById,
  signUp,
  resetPassword,
  showAllUser,
  signUpForApps,
} from "../controllers/user.controller.js";

const router = Router();

router.post(routers_interface.api + routers_interface.user.signup, signUp);
router.post(routers_interface.api + routers_interface.user.signin, signIn);
router.post(
  routers_interface.api + routers_interface.user.resetpassword,
  resetPassword
);
router.post(
  routers_interface.api + routers_interface.user.signupApp,
  signUpForApps
);

router.get(routers_interface.api + routers_interface.user.getById, getById);
router.get(
  routers_interface.api + routers_interface.user.showAllUser,
  showAllUser
);

export default router;
