import { Router } from "express";
import {
  listFarms,
  getFarm,
  createFarm,
  updateFarm,
  deleteFarm,
} from "../controllers/farm.controller";

const router = Router();

router.get("/farms", listFarms);
router.get("/farms/:id", getFarm);
router.post("/farms", createFarm);
router.put("/farms/:id", updateFarm);
router.delete("/farms/:id", deleteFarm);

export default router;
