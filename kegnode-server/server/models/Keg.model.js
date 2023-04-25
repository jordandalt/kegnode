const Keg = (sequelize, DataTypes) => {
  return sequelize.define("Keg", {
    identity: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    brewery: {
      type: DataTypes.STRING,
    },
    beerName: {
      type: DataTypes.STRING,
    },
    beerType: {
      type: DataTypes.STRING,
    },
    initialVolume: {
      type: DataTypes.INTEGER,
    },
    currentVolume: {
      type: DataTypes.INTEGER,
    },
    tappedOn: {
      type: DataTypes.DATE,
    },
    kickedOn: {
      type: DataTypes.DATE,
    },
  });
};

export default Keg;
