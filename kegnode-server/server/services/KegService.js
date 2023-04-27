import db from "../models";

const Tap = db.Taps;
const Keg = db.Kegs;
const Pour = db.Pours;
const Beer = db.Beers;

export const getKeg = async (kegIdentity) => {
  return Keg.findByPk(kegIdentity, { include: [Pour, Tap, Beer] });
};

export const getAllKegs = () => {
  return Keg.findAll({ include: [Pour, Tap, Beer] });
};

export const createKeg = async (kegObject) => {
  const {
    brewery,
    name,
    type,
    description,
    abv,
    initialVolume,
    currentVolume,
    tapIdentity,
  } = kegObject;

  let tap = null;
  if (tapIdentity) {
    tap = await Tap.findByPk(tapIdentity);
  }

  return Keg.create(
    {
      initialVolume: parseInt(initialVolume),
      currentVolume: parseInt(currentVolume),
      Beer: {
        brewery,
        name,
        type,
        description,
        alcoholByVolume: parseFloat(abv),
      },
      Tap: tap,
    },
    {
      include: [Beer, Tap],
    }
  );
};

export const updateKegOfIdentity = async (kegIdentity, kegObject) => {
  const {
    brewery,
    name,
    type,
    description,
    abv,
    initialVolume,
    currentVolume,
    tapIdentity,
  } = kegObject;
  const keg = await Keg.findByPk(kegIdentity, { include: [Beer] });
  let tap = null;

  // Let's tap that keg!
  if (tapIdentity && !keg.kickedOn) {
    tap = await Tap.findByPk(tapIdentity);
    await tap.setKeg(keg);
    keg.tappedOn = Date.now();
  }

  // We may want to occasionally remove a keg from a tap.
  if (!tapIdentity && keg.tappedOn) {
    await keg.setTap(null);
    keg.tappedOn = null;
  }

  keg.initialVolume = parseInt(initialVolume);
  keg.currentVolume = parseInt(currentVolume);
  if (keg.Beer) {
    keg.Beer.brewery = brewery;
    keg.Beer.name = name;
    keg.Beer.type = type;
    keg.Beer.description = description;
    keg.Beer.alcoholByVolume = parseFloat(abv);
    keg.Beer.save();
  } else {
    const newBeer = await Beer.create({
      brewery,
      name,
      type,
      description,
      alcoholByVolume: parseFloat(abv),
    });
    await keg.setBeer(newBeer);
  }
  return keg.save();
};

export const deleteKegOfIdentity = async (kegIdentity) => {
  const count = await Keg.destroy({
    where: {
      identity: kegIdentity,
    }
  });
  const tap = await Tap.findOne({
    where: {
      KegIdentity: kegIdentity,
    }
  });
  if (tap) {
    await tap.setKeg(null);
  }
  
  return {
    ok: count === 1,
  };
};
