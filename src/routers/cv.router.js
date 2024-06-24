import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import { getCV, createCV } from "../controllers/cv.controller.js";

const router = Router();

router.get(routers_interface.cv.getAll, getCV);
router.post(routers_interface.cv.create, createCV);

export default router;
