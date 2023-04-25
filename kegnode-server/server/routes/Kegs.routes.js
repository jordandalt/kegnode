import express from "express";
import * as KegsController from "../controllers/Kegs.controller";

const router = express.Router();

// GET all kegs
router.get("/", KegsController.getKegs);

// GET keg by id
router.get("/:kegIdentity", KegsController.getKeg);

// POST create keg
router.post("/", KegsController.createKeg);

// PUT update keg
router.put("/:kegIdentity", KegsController.updateKeg);

export default router;
