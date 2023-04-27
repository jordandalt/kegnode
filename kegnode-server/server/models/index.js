import Sequelize, { DataTypes } from "sequelize";

import * as dbConfig from "../db/config";

import Tap from "./Tap.model";
import Keg from "./Keg.model";
import Pour from "./Pour.model";
import Beer from "./Beer.model";

const db = {};

const sequelize = new Sequelize(dbConfig);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Taps = Tap(sequelize, DataTypes);
db.Kegs = Keg(sequelize, DataTypes);
db.Pours = Pour(sequelize, DataTypes);
db.Beers = Beer(sequelize, DataTypes);

db.Kegs.hasOne(db.Taps);
db.Taps.belongsTo(db.Kegs);

db.Kegs.hasMany(db.Pours);
db.Pours.belongsTo(db.Kegs);

db.Kegs.hasOne(db.Beers);
db.Beers.belongsTo(db.Kegs);

export default db;
