import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import { signIn, getById, signUp } from "../controllers/user.controller.js";

const router = Router();

router.post(routers_interface.user.signup, signUp);
router.post(routers_interface.user.signin, signIn);
router.get(routers_interface.user.getById, getById);

export default router;
