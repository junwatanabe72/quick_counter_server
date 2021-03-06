import express, { Request, Response, NextFunction } from "express";
import http from "http";
import debug from "debug";
import dotenv from "dotenv";
import logger from "morgan";
import { usersRouter } from "./routes/users";

const app = express();

dotenv.config();
debug("express-typescript:server");
const resHeader = function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
  next();
};
//middleware
app.use(resHeader);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "ok" });
});
app.use("/users", usersRouter);

const server = http.createServer(app);
const port = process.env.PORT || "3000";

app.set("port", port);
server.listen(port);
