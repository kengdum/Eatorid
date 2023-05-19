import mongoose from "mongoose";

interface RestaurantInterface extends mongoose.Document {
  name: string;
  schedule: { opening: string; closing: string }[];
  minimumOrder: number;
  deliveryMaxDistance: number;
  deliveryPrice: number;
  extraDeliveryFee: number;
}

const restaurantSchema = new mongoose.Schema<RestaurantInterface>({
  name: {
    type: String,
    required: true,
  },
  schedule: {
    type: [
      {
        opening: {
          type: String,
          default: null,
        },
        closing: {
          type: String,
          default: null,
        },
      },
    ],
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

const Restaurant = mongoose.model<RestaurantInterface>("restaurant", restaurantSchema);

export default Restaurant;
