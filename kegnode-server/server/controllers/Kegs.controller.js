import * as KegService from "../services/KegService";

export const getKeg = (req, res) => {
  const { kegIdentity } = req.params;
  KegService.getKeg(kegIdentity)
    .then((keg) => {
      if (keg) {
        res.send(keg);
      } else {
        res.status(404).send({
          message: `Cannot find Keg with id=${kegIdentity}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred retrieving keg ${kegIdentity}.`,
      });
    });
};

export const getKegs = (req, res) => {
  KegService.getAllKegs()
    .then((kegs) => {
      res.send(kegs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred retrieving kegs.`,
      });
    });
};

export const createKeg = (req, res) => {
  const kegObject = req.body;
  KegService.createKeg(kegObject)
    .then((keg) => {
      res.send(keg);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred creating keg.`,
      });
    });
};

export const updateKeg = (req, res) => {
  const { kegIdentity } = req.params;
  const kegObject = req.body;
  KegService.updateKegOfIdentity(kegIdentity, kegObject)
    .then((keg) => {
      res.send(keg);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error occurred updating keg ${kegIdentity}.`,
      });
    });
};
