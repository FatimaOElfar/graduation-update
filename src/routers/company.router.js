import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  showAll,
  signInCompany,
  signUpCompany,
  getById,
} from "../controllers/company.controller.js";
import { upload } from "../middlewares/uploader.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = Router();

router.post(
  routers_interface.api + routers_interface.company.login,
  authenticateToken,
  signInCompany
);

router.post(
  routers_interface.api + routers_interface.company.register,
  upload.single("image"),
  signUpCompany
);
router.get(
  routers_interface.api + routers_interface.company.showAll,

  showAll
);
router.get(
  routers_interface.api + routers_interface.company.getById,
  authenticateToken,
  getById
);

export default router;
