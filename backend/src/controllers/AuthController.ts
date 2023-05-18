import dotenv from "dotenv";

dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpErrors from "http-errors";
import User from "../models/User";

class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;

      const doesExist = await User.findOne({ email });

      if (doesExist) throw httpErrors.Conflict("Account already registered");

      const user = new User({ email, name, password });
      await user.save();

      res.send({ message: "User created!" });
    } catch (err) {
      next(err);
    }
  }

  public async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) throw httpErrors.Unauthorized("Invalid Credentials");
      if (!(await user.isPasswordValid(password))) throw httpErrors.Unauthorized("Invalid Credentials");

      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!);

      res.send({ user: { id: user._id, name: user.name, email: user.email }, accessToken });
    } catch (err) {
      next(err);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
        throw httpErrors.Unauthorized("Invalid token");

      const accessToken = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
      const user = await User.findById(decodedToken.userId);

      if (!user) throw httpErrors.NotFound();

      res.send({ user: { id: user._id, name: user.name, email: user.email }, accessToken });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
