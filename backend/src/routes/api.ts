import { NextFunction, Request, Response, Router } from "express";
import RestaurantsController from "../controllers/RestaurantsController";
import OrdersController from "../controllers/OrdersController";
import httpErrors from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const router: Router = Router();

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
      throw httpErrors.Unauthorized("You must be authenticated to use this resource");

    const accessToken = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    const user = await User.findById(decodedToken.userId);

    if (!user) throw httpErrors.NotFound();

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    next(error);
  }
};

router.get("/featured-restaurants", RestaurantsController.getFeaturedRestaurants);
router.get("/restaurants", RestaurantsController.getRestaurants);
router.get("/restaurants/:id", RestaurantsController.getRestaurantById);

router.get("/all-orders", OrdersController.getAllOrders);
router.get("/orders", authenticate, OrdersController.getOrders);
router.post("/orders", authenticate, OrdersController.placeOrder);
router.patch("/orders", OrdersController.updateOrderStatus);

export default router;
