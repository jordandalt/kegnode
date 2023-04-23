"use strict";

import Sequelize from "sequelize";

const db = {};

const sequelize = new Sequelize(process.env.DB_CONNECTION);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
