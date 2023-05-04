const Tap = (sequelize, DataTypes) => {
  return sequelize.define("Tap", {
    identity: {
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastKegKickedOn: {
      type: DataTypes.DATE,
    },
  });
};

export default Tap;
