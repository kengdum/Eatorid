import dotenv from "dotenv";

dotenv.config();

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import httpErrors from "http-errors";
import routes from "./routes";

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(httpErrors.NotFound());
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const error = {
    status: err.status || 500,
    message: err.message,
  };

  res.status(error.status).send(error);
});

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Could not connect");
    console.log(err);
  });
