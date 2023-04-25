import express from "express";
import * as TapsController from "../controllers/Taps.controller";

const router = express.Router();

// GET all taps
router.get("/", TapsController.getTaps);

// GET tap by id
router.get("/:tapIdentity", TapsController.getTap);

// POST pour to tap
router.post("/:tapIdentity/pour", TapsController.recordPourForTap);

// PUT tap keg
router.put("/:tapIdentity/keg/:kegIdentity", TapsController.tapKeg);

export default router;
