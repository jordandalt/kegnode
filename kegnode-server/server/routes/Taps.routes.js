import express from "express";
import * as TapsController from "../controllers/Taps.controller";

const router = express.Router();

// GET all taps
router.get("/", TapsController.getTaps);

// GET tap by id
router.get("/:tapId", TapsController.getTap);

// POST pour to tap
router.post("/:tapId/pour", TapsController.recordPourForTap);

export default router;
