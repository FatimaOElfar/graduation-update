import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import { getImage } from "../controllers/images.controller.js";
const router = Router();

router.get(routers_interface.images.get, getImage);

export default router;
