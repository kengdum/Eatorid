import dotenv from "dotenv";

dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpErrors from "http-errors";
import User from "../models/User";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";

class RestaurantsController {
  public async getFeaturedRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const totalCount = await Restaurant.countDocuments({});
      const featuredRestaurants = await Restaurant.find()
        .sort({ name: 1 })
        .skip(Math.floor(Math.random() * (totalCount - 3)))
        .limit(4);

      res.send(featuredRestaurants);
    } catch (err) {
      next(err);
    }
  }

  public async getRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const query = req.query.q || "";
      const limit = 12;
      const skip = (page - 1) * limit;

      const totalCount = await Restaurant.countDocuments({ name: { $regex: query, $options: "i" } });
      const restaurants = await Restaurant.find({ name: { $regex: query, $options: "i" } })
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit);

      res.send({ restaurants, total: totalCount, nextPage: page * limit < totalCount ? page + 1 : undefined });
    } catch (err) {
      next(err);
    }
  }

  public async getRestaurantById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const restaurant = await Restaurant.findById(id);

      if (!restaurant) throw httpErrors.NotFound("Restaurant not found");

      const menu = await Menu.find({ restaurant: id });

      res.send({ restaurant, menu });
    } catch (err) {
      next(err);
    }
  }
}

export default new RestaurantsController();
