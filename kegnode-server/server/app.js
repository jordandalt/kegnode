import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import kegsRouter from "./routes/Kegs.routes";
import tapsRouter from "./routes/Taps.routes";

import db from './models';

const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../public")));

// Models
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Routes/Controllers
app.use("/api/taps", tapsRouter);
app.use("/api/kegs", kegsRouter);

export default app;
