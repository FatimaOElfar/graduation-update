import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  signIn,
  getById,
  signUp,
  showAllUser,
  signUpForApps,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = Router();

router.post(routers_interface.api + routers_interface.user.register, signUp);
router.post(
  routers_interface.api + routers_interface.user.login,
  authenticateToken,
  signIn
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
