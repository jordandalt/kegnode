import * as TapService from "../services/TapService";

export const getTap = (req, res) => {
  const { tapId } = req.params;
  TapService.getTap(tapId)
    .then((tap) => {
      if (tap) {
        res.send(tap);
      } else {
        res.status(404).send({
          message: `Cannot find Tap with id=${tapId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred retrieving tap ${tapId}.`,
      });
    });
};

export const getTaps = (req, res) => {
  TapService.getAllTaps()
    .then((taps) => {
      res.send(taps);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred retrieving taps.`,
      });
    });
};

export const recordPourForTap = (req, res) => {
  const { tapId } = req.params;
  const pourObject = req.body;
  console.log(tapId, pourObject);
  res.send(`Tap ${tapId} is poured!`);
};
