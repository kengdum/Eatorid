import { Router } from "express";
import RestaurantsController from "../controllers/RestaurantsController";

const router: Router = Router();

router.get("/featured-restaurants", RestaurantsController.getFeaturedRestaurants);
router.get("/restaurants", RestaurantsController.getRestaurants);

export default router;
