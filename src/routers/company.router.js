import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  signInCompany,
  signUpCompany,
} from "../controllers/company.controller.js";

const router = Router();

router.post(routers_interface.company.signin, signInCompany);
router.post(routers_interface.company.signup, signUpCompany);

export default router;
