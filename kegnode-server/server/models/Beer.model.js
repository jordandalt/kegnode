const Beer = (sequelize, DataTypes) => {
  return sequelize.define("Beer", {
    identity: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    brewery: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    alcoholByVolume: {
      type: DataTypes.FLOAT,
    },
  });
};

export default Beer;
