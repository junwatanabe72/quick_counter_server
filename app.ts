import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import debug from "debug";
import dotenv from "dotenv";
import logger from "morgan";
import passport from "passport";
import "./middlewares/passport";
import { usersRouter } from "./routes/users";

const app = express();

dotenv.config();
debug("express-typescript:server");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(passport.initialize());

//router
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "ok" });
});
app.use("/user", usersRouter);

const server = http.createServer(app);
const port = process.env.PORT || "3000";

app.set("port", port);
server.listen(port);
