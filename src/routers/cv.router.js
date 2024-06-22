import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import { getCV } from "../controllers/cv.controller.js";

const router = Router();

router.get(routers_interface.cv.getAll, getCV);

export default router;
