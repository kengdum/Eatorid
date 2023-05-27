"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RestaurantsController_1 = __importDefault(require("../controllers/RestaurantsController"));
const OrdersController_1 = __importDefault(require("../controllers/OrdersController"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
            throw http_errors_1.default.Unauthorized("You must be authenticated to use this resource");
        const accessToken = authorizationHeader.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = yield User_1.default.findById(decodedToken.userId);
        if (!user)
            throw http_errors_1.default.NotFound();
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        next(error);
    }
});
router.get("/featured-restaurants", RestaurantsController_1.default.getFeaturedRestaurants);
router.get("/restaurants", RestaurantsController_1.default.getRestaurants);
router.get("/restaurants/:id", RestaurantsController_1.default.getRestaurantById);
router.get("/all-orders", OrdersController_1.default.getAllOrders);
router.get("/orders", authenticate, OrdersController_1.default.getOrders);
router.post("/orders", authenticate, OrdersController_1.default.placeOrder);
router.patch("/orders", OrdersController_1.default.updateOrderStatus);
exports.default = router;
