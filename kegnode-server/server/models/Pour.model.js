const Pour = (sequelize, DataTypes) => {
  return sequelize.define("Pour", {
    pourIdentity: {
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
      field: "started_on",
    },
    endedOn: {
      type: DataTypes.DATE,
      field: "endedOn",
    },
  });
};

export default Pour;
