import { Request, Response, NextFunction } from "express";
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

      res.send({ user });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
