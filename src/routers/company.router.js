import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  signInCompany,
  signUpCompany,
} from "../controllers/Company.controller.js";
const router = Router();
router.post(routers_interface.company.signin, signUpCompany);
router.post(routers_interface.company.signup, signInCompany);
export default router;
