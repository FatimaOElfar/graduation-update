import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  showAll,
  signInCompany,
  signUpCompany,
} from "../controllers/company.controller.js";

const router = Router();

router.post(routers_interface.company.signin, signInCompany);
router.post(routers_interface.company.signup, signUpCompany);
router.get(routers_interface.company.showAll, showAll);

export default router;
