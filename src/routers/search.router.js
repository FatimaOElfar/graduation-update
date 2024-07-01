import { Router } from "express";
import routers_interface from "../utils/routers.interface.js";
import {
  searchCompaniesByCompanyName,
  searchByJobPosition,
} from "../controllers/search.controller.js";

const router = Router();
router.get(routers_interface.search.company, searchCompaniesByCompanyName);
router.get(routers_interface.search.position, searchByJobPosition);

export default router;
