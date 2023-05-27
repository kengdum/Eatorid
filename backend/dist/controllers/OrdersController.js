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
const Order_1 = __importDefault(require("../models/Order"));
const http_errors_1 = __importDefault(require("http-errors"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
class OrdersController {
    getOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const page = parseInt(req.query.page) || 1;
                const limit = 10;
                const skip = (page - 1) * limit;
                const totalCount = yield Order_1.default.countDocuments({ userId });
                const orders = yield Order_1.default.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
                res.send({ orders, nextPage: page * limit < totalCount ? page + 1 : undefined });
            }
            catch (err) {
                next(err);
            }
        });
    }
    placeOrder(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                const now = new Date();
                const dayOfWeek = now.getDay();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const restaurant = yield Restaurant_1.default.findOne({ _id: data.cart.header.restaurantId });
                if (!restaurant)
                    throw http_errors_1.default.NotFound("Restaurant not found!");
                console.log(restaurant.schedule[dayOfWeek]);
                const opening = {
                    h: Number((_a = restaurant.schedule[dayOfWeek].opening) === null || _a === void 0 ? void 0 : _a.split(":")[0]),
                    m: Number((_b = restaurant.schedule[dayOfWeek].opening) === null || _b === void 0 ? void 0 : _b.split(":")[1]),
                };
                const closing = {
                    h: Number((_c = restaurant.schedule[dayOfWeek].closing) === null || _c === void 0 ? void 0 : _c.split(":")[0]),
                    m: Number((_d = restaurant.schedule[dayOfWeek].closing) === null || _d === void 0 ? void 0 : _d.split(":")[1]),
                };
                const openingTimeInMinutes = opening.h * 60 + opening.m;
                const closingTimeInMinutes = closing.h * 60 + closing.m;
                const currentTimeInMinutes = currentHour * 60 + currentMinute;
                const isOpen = !isNaN(openingTimeInMinutes) &&
                    currentTimeInMinutes >= openingTimeInMinutes &&
                    currentTimeInMinutes <= closingTimeInMinutes;
                if (!isOpen)
                    throw http_errors_1.default.BadRequest("Restaurant is closed!");
                const newOrder = new Order_1.default({
                    userId: req.userId,
                    restaurantId: data.cart.header.restaurantId,
                    restaurantName: data.cart.header.restaurantName,
                    address: data.address,
                    distance: data.distance,
                    mentions: data.mentions,
                    items: data.cart.items,
                    deliveryFee: data.cart.header.deliveryPrice,
                    extraDeliveryFee: data.extraDeliveryFee,
                });
                yield newOrder.save();
                res.send({ message: "Order placed!!!" });
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allOrders = yield Order_1.default.find({}).sort({ createdAt: -1 });
                res.send({ orders: allOrders });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateOrderStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!["confirming", "preparing", "delivering", "rejected", "completed"].includes(req.body.data.val))
                    throw http_errors_1.default.BadRequest("Very bad request 😤");
                yield Order_1.default.updateOne({ _id: req.body.data.orderId }, { $set: { status: req.body.data.val } });
                res.send({ message: "Updated!" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new OrdersController();
