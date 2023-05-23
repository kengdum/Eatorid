"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scheduleSchema = new mongoose_1.default.Schema({
    opening: {
        type: String,
        default: null,
    },
    closing: {
        type: String,
        default: null,
    },
});
const restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    schedule: {
        type: [scheduleSchema],
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
    d: {
        type: [String],
        default: [
            "M0 59L30 83.2C60 107.3 120 155.7 180 175.8C240 196 300 188 360 184.8C420 181.7 480 183.3 540 184.5C600 185.7 660 186.3 720 177.5C780 168.7 840 150.3 870 141.2L900 132L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
            "M0 336L30 335.7C60 335.3 120 334.7 180 327.7C240 320.7 300 307.3 360 304.3C420 301.3 480 308.7 540 312.8C600 317 660 318 720 305.7C780 293.3 840 267.7 870 254.8L900 242L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
            "M0 385L30 381.3C60 377.7 120 370.3 180 372C240 373.7 300 384.3 360 409.8C420 435.3 480 475.7 540 479.8C600 484 660 452 720 433.3C780 414.7 840 409.3 870 406.7L900 404L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
        ],
    },
    fill: {
        type: [String],
        default: ["#A61E4D", "#C2255C", "#D6336C"],
    },
});
const Restaurant = mongoose_1.default.model("restaurant", restaurantSchema);
exports.default = Restaurant;
