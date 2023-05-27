import dotenv from "dotenv";

dotenv.config();

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
import { seedDatabase } from "./database_seeding";
import path from "path";
import httpErrors from "http-errors";

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "../public")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use((req, res, next) => {
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
    return seedDatabase();
  })
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
