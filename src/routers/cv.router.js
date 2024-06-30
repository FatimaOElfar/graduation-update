import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  getCV,
  createCV,
  deleteCV,
  updateCV,
} from "../controllers/cv.controller.js";

const router = Router();

router.get(routers_interface.api + routers_interface.cv.getById, getCV);
router.post(routers_interface.api + routers_interface.cv.create, createCV);
router.delete(routers_interface.api + routers_interface.cv.delete, deleteCV);
router.put(routers_interface.api + routers_interface.cv.update, updateCV);

export default router;
