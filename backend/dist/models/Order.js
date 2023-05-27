"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    menuId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "menu",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    mentions: {
        type: String,
    },
    items: {
        type: [orderItemSchema],
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    extraDeliveryFee: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "confirming",
    },
}, { timestamps: true });
const Order = mongoose_1.default.model("order", orderSchema);
exports.default = Order;
