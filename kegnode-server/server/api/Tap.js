import express from 'express';
var router = express.Router();

/* GET tap status */
router.get('/taps/:tapId', (req, res) => {
    const { tapId } = req.params;
    res.send(`Tap ${tapId} is GTG!`);
});

/* POST pour to tap */
router.post('/taps/:tapId', (req, res) => {
    const { tapId } = req.params;
    res.send(`Tap ${tapId} is poured!`);
});

export default router;
