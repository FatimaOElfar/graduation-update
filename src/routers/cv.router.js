import { getCV } from "../controllers/Cv.controller.js";
import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
const router = Router();
router.get(routers_interface.cv.getAll, getCV);