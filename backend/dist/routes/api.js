"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RestaurantsController_1 = __importDefault(require("../controllers/RestaurantsController"));
const router = (0, express_1.Router)();
router.get("/featured-restaurants", RestaurantsController_1.default.getFeaturedRestaurants);
router.get("/restaurants", RestaurantsController_1.default.getRestaurants);
exports.default = router;
