import db from "../models";

const Tap = db.Taps;
const Keg = db.Kegs;
const Pour = db.Pours;

export const getKeg = async (kegIdentity) => {
  return Keg.findByPk(kegIdentity);
};

export const getAllKegs = () => {
  return Keg.findAll({ include: Pour });
};

export const createKeg = (kegObject) => {
  return Keg.create(kegObject);
};

export const updateKeg = async (kegIdentity, kegObject) => {
  const keg = await Keg.findByPk(kegIdentity);
  await keg.update(kegObject);
  return keg.save();
};
