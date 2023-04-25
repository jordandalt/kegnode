const Pour = (sequelize, DataTypes) => {
  return sequelize.define("Pour", {
    identity: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    meterIdentity: {
      type: DataTypes.STRING,
    },
    volume: {
      type: DataTypes.INTEGER,
    },
    startedOn: {
      type: DataTypes.DATE,
    },
    endedOn: {
      type: DataTypes.DATE,
    },
  });
};

export default Pour;
