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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_errors_1 = __importDefault(require("http-errors"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Menu_1 = __importDefault(require("../models/Menu"));
class RestaurantsController {
    getFeaturedRestaurants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield Restaurant_1.default.countDocuments({});
                const featuredRestaurants = yield Restaurant_1.default.find()
                    .sort({ name: 1 })
                    .skip(Math.floor(Math.random() * (totalCount - 3)))
                    .limit(4);
                res.send(featuredRestaurants);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getRestaurants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const query = req.query.q || "";
                const limit = 12;
                const skip = (page - 1) * limit;
                const totalCount = yield Restaurant_1.default.countDocuments({ name: { $regex: query, $options: "i" } });
                const restaurants = yield Restaurant_1.default.find({ name: { $regex: query, $options: "i" } })
                    .sort({ name: 1 })
                    .skip(skip)
                    .limit(limit);
                res.send({ restaurants, total: totalCount, nextPage: page * limit < totalCount ? page + 1 : undefined });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getRestaurantById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const restaurant = yield Restaurant_1.default.findById(id);
                if (!restaurant)
                    throw http_errors_1.default.NotFound("Restaurant not found");
                const menu = yield Menu_1.default.find({ restaurant: id });
                res.send({ restaurant, menu });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new RestaurantsController();
