import Sequelize, { DataTypes } from "sequelize";

import * as dbConfig from "../db/config";

import Tap from "./Tap.model";
import Keg from "./Keg.model";
import Pour from "./Pour.model";

const db = {};

const sequelize = new Sequelize(dbConfig);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Taps = Tap(sequelize, DataTypes);
db.Kegs = Keg(sequelize, DataTypes);
db.Pours = Pour(sequelize, DataTypes);

db.Taps.hasOne(db.Kegs);
db.Kegs.belongsTo(db.Taps, {
  foreignKey: "tapIdentity",
});
db.Kegs.hasMany(db.Pours);
db.Pours.belongsTo(db.Kegs, {
  foreignKey: "kegIdentity",
});

export default db;
