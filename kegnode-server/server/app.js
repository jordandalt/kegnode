import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from './routes';
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

// Routes/Controllers
app.use("/", indexRouter);
app.use("/taps", tapsRouter);

export default app;
