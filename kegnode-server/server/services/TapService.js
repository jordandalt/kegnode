import db from '../models';

const Tap = db.Taps;
const Keg = db.Kegs;
const Pour = db.Pours;

export const getTap = async (tapIdentity) => {
  return Tap.findByPk(tapIdentity);
}

export const getAllTaps = () => {
  return Tap.findAll();
}

// export const attachKegToTap = (tapIdentity, kegIdentity) => {
//   const tap = this.tapRepository.findByIdentity(tapIdentity);
//   const keg = this.kegRepository.findByIdentity(kegIdentity);
// };

// export const getTapStatus = (tapIdentity) => {
//   const tap = this.tapRepository.findByIdentity(tapIdentity);
//   const keg = this.kegRepository.findByIdentity(tap.getCurrentKegIdentity());
//   return {
//     tapIdentity,
//     tapStatus: tap.getStatus(),
//     kegLevel: keg ? keg.getLevel() : null,
//   };
// };

// export const recordPour = (tapIdentity, pourObject) => {
//   const tap = this.tapRepository.findByIdentity(tapIdentity);
//   const pour = this.pourRepository.createPourFromObject(pourObject);
// };
