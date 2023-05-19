"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    minimumOrder: {
        type: Number,
        required: true,
        default: 0,
    },
    deliveryMaxDistance: {
        type: Number,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    extraDeliveryFee: {
        type: Number,
        required: true,
    },
});
const Restaurant = mongoose_1.default.model("restaurant", restaurantSchema);
exports.default = Restaurant;
