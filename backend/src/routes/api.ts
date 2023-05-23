import { Router } from "express";
import RestaurantsController from "../controllers/RestaurantsController";

const router: Router = Router();

router.get("/featured-restaurants", RestaurantsController.getFeaturedRestaurants);
router.get("/restaurants", RestaurantsController.getRestaurants);
router.get("/restaurants/:id", RestaurantsController.getRestaurantById);

export default router;
