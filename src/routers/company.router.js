import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  showAll,
  signInCompany,
  signUpCompany,
  getById,
} from "../controllers/company.controller.js";
import { upload } from "../middleware/uploader.js";
const router = Router();

router.post(
  routers_interface.api + routers_interface.company.signin,
  signInCompany
);

router.post(
  routers_interface.api + routers_interface.company.signup,
  upload.single("image"),
  signUpCompany
);
router.get(routers_interface.api + routers_interface.company.showAll, showAll);
router.get(routers_interface.api + routers_interface.company.getById, getById);

export default router;
