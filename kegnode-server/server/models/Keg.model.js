const Keg = (sequelize, DataTypes) => {
  return sequelize.define("Keg", {
    kegIdentity: {
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
      type: DataTypes.FLOAT,
    },
    tappedOn: {
      type: DataTypes.DATE,
      field: "tapped_on",
    },
    kickedOn: {
      type: DataTypes.DATE,
      field: "kicked_on",
    },
  });
};

export default Keg;
