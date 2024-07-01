import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import { resetPassword, sendOTP } from "../controllers/entities.controller.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = Router();

router.post(
  routers_interface.api + routers_interface.entity.resetpassword,
  authenticateToken,
  resetPassword
);
router.post(
  routers_interface.api + routers_interface.entity.sendOTP,
  authenticateToken,
  sendOTP
);

export default router;
