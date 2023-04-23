import express from "express";

const router = express.Router();

/* GET tap status */
router.get("/:tapId", (req, res) => {
  const { tapId } = req.params;
  res.send(`Tap ${tapId} is GTG!`);
});

/* POST pour to tap */
router.post("/:tapId", (req, res) => {
  const { tapId } = req.params;
  const pourObject = req.body;
  console.log(tapId, pourObject);
//   res.send(`Tap ${tapId} is poured!`);
});

export default router;
