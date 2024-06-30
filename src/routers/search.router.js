import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  searchByJobPosition,
  searchByName,
} from "../controllers/search.controller.js";

const router = Router();
router.get(
  routers_interface.api + routers_interface.search.companyName,
  searchByName
);
router.get(
  routers_interface.api + routers_interface.search.position,
  searchByJobPosition
);

export default router;
