const Keg = (sequelize, DataTypes) => {
  return sequelize.define("Keg", {
    identity: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
