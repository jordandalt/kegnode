const Tap = (sequelize, DataTypes) => {
  return sequelize.define("Tap", {
    tapIdentity: {
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default Tap;
