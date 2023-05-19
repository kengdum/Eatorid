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
exports.seedDatabase = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const restaurantNames = [
    "Taste of Italy",
    "Spice Fusion",
    "The Hungry Bear",
    "Sizzling Grill",
    "Fresh Bites",
    "The Pasta House",
    "Oriental Delight",
    "Cheesy Pizzas",
    "The Burger Joint",
    "Veggie Garden",
    "Seafood Paradise",
    "The Spice Route",
    "Cozy Cafe",
    "BBQ Nation",
    "Sweet Treats",
    "Urban Diner",
    "Farm to Fork",
    "Green Leaf Salad Bar",
    "Fiesta Mexicana",
    "Wok and Roll",
    "Food Haven",
    "Flavor Fusion",
    "The Grill House",
    "Crispy Crust",
    "Gourmet Delights",
    "Mango Tango",
    "Golden Wok",
    "Wholesome Kitchen",
    "Savory Bites",
    "The Charming Cup",
    "Coco Loco",
    "Babajee",
    "420",
];
const openingHours = [8, 9, 10, 11, 12];
const closingHours = [16, 17, 18, 19, 20, 21, 22];
const minimumOrderPrices = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const deliveryMaxDistances = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
const deliveryPrices = [0, 2.99, 3.99, 4.99, 5.99, 6.99, 7.99, 8.99];
const extraDeliveryFees = [1.99, 2.99, 3.99, 4.99];
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENV === "production")
            return;
        const count = yield Restaurant_1.default.countDocuments({});
        if (count !== 0)
            return;
        const data = restaurantNames.map(x => ({
            name: x,
            minimumOrder: minimumOrderPrices[Math.floor(Math.random() * minimumOrderPrices.length)],
        }));
        // const testRestaurant = new Restaurant({
        //   name: restaurantNames[Math.floor(Math.random() * restaurantNames.length)],
        //   minimumOrder: minimumOrderPrices[Math.floor(Math.random() * minimumOrderPrices.length)],
        //   deliveryMaxDistance: deliveryMaxDistances[Math.floor(Math.random() * deliveryMaxDistances.length)],
        //   deliveryPrice: deliveryPrices[Math.floor(Math.random() * deliveryPrices.length)],
        //   extraDeliveryFee: extraDeliveryFees[Math.floor(Math.random() * extraDeliveryFees.length)],
        // });
        console.log(data);
        // await testRestaurant.save();
        console.log("done seeding...!!!da");
    }
    catch (err) {
        console.log("Something went wrong");
        console.log(err);
    }
});
exports.seedDatabase = seedDatabase;
