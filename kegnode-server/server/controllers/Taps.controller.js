import * as TapService from "../services/TapService";

export const getTap = (req, res) => {
  const { tapIdentity } = req.params;
  TapService.getTap(tapIdentity)
    .then((tap) => {
      if (tap) {
        res.send(tap);
      } else {
        res.status(404).send({
          message: `Cannot find Tap with id=${tapIdentity}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred retrieving tap ${tapIdentity}.`,
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

export const getOpenTaps = async (req, res) => {
  try {
    const taps = await TapService.getOpenTaps();
    res.send(taps);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error occurred retrieving open taps.`,
    });
  }
};

export const recordPourForTap = (req, res) => {
  const { tapIdentity } = req.params;
  const pourObject = req.body;
  TapService.recordPour(tapIdentity, pourObject)
    .then((tap) => {
      if (tap) {
        res.send(tap);
      } else {
        res.status(400).send({
          message: `Please confirm tap ${tapIdentity} has a keg before recording a pour!`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          `Error occurred recording pour for tap ${tapIdentity}.`,
      });
    });
};

export const tapKeg = (req, res) => {
  const { tapIdentity, kegIdentity } = req.params;
  TapService.attachKegToTap(tapIdentity, kegIdentity)
    .then((tap) => {
      if (tap) {
        res.send(tap);
      } else {
        res.status(400).send({
          message: `Keg ${kegIdentity} has already kicked and can't be attached to any tap!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error occurred tapping keg ${kegIdentity} on tap ${tapIdentity}.`,
      });
    });
};
