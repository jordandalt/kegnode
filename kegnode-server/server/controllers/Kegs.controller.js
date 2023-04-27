import * as KegService from "../services/KegService";

export const getKeg = async (req, res) => {
  try {
    const { kegIdentity } = req.params;
    const keg = await KegService.getKeg(kegIdentity);
    if (keg) {
      res.send(keg);
    } else {
      res.status(404).send({
        message: `Cannot find Keg with id=${kegIdentity}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error occurred retrieving keg ${kegIdentity}.`,
    });
  }
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

export const createKeg = async (req, res) => {
  try {
    const kegObject = req.body;
    const keg = await KegService.createKeg(kegObject);
    res.send(keg);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error occurred creating keg.`,
    });
  }
};

export const updateKeg = async (req, res) => {
  try {
    const { kegIdentity } = req.params;
    const kegObject = req.body;
    const keg = await KegService.updateKegOfIdentity(kegIdentity, kegObject);
    res.send(keg);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error occurred updating keg ${kegIdentity}.`,
    });
  }
};

// @TODO: make this a soft delete instead
export const deleteKeg = async (req, res) => {
  try {
    const { kegIdentity } = req.params;
    const status = await KegService.deleteKegOfIdentity(kegIdentity);
    if (status.ok) {
      res.send(status);
    } else {
      res.status(404).send({
        message: `Cannot find Keg with id=${kegIdentity}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error occurred retrieving keg ${kegIdentity}.`,
    });
  }
};
