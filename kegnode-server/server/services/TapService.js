import db from "../models";

const Tap = db.Taps;
const Keg = db.Kegs;
const Pour = db.Pours;
const Beer = db.Beers;

export const getTap = async (tapIdentity) => {
  return Tap.findByPk(tapIdentity, {
    include: [
      {
        model: Keg,
        include: [Pour, Beer],
      },
    ],
  });
};

export const getAllTaps = () => {
  return Tap.findAll({
    include: [
      {
        model: Keg,
        include: [Pour, Beer],
      },
    ],
    order: [["identity", "ASC"]],
  });
};

export const getOpenTaps = () => {
  return Tap.findAll({
    order: [["identity", "ASC"]],
    where: { "KegIdentity": null },
  });
}

export const attachKegToTap = async (tapIdentity, kegIdentity) => {
  const tap = await Tap.findByPk(tapIdentity);
  const keg = await Keg.findByPk(kegIdentity);
  if (keg.kickedOn) {
    // Don't attach an empty keg to a tap
    return null;
  }
  tap.setKeg(keg);
  keg.tappedOn = Date.now();
  await keg.save();
  return tap.save();
};

export const recordPour = async (tapIdentity, pourObject) => {
  const tap = await Tap.findByPk(tapIdentity, { include: Keg });
  const keg = tap.Keg;
  if (!keg) {
    // We need a tapped keg to record a pour
    return null;
  }

  const {
    meterIdentity,
    startTimestamp,
    endTimestamp,
    totalVolume: volume,
  } = pourObject;
  const newKegVolume = keg.currentVolume - volume;
  const startedOn = new Date(startTimestamp);
  const endedOn = new Date(endTimestamp);
  const newPour = await Pour.create({
    meterIdentity,
    volume,
    startedOn,
    endedOn,
  });

  keg.currentVolume = newKegVolume >= 0 ? newKegVolume : 0;
  if (newKegVolume <= 0) {
    // We kicked the keg!
    tap.lastKegKickedOn = keg.kickedOn = new Date();
  }
  await keg.addPour(newPour);
  await keg.save();
  return tap.save();
};
