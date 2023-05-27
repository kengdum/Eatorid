import mongoose from "mongoose";

export interface IOrderItem {
  menuId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  restaurantName: string;
  address: string;
  distance: number;
  mentions: string;
  items: IOrderItem[];
  deliveryFee: number;
  extraDeliveryFee: number;
  status: "confirming" | "preparing" | "delivering" | "rejected" | "completed";
}

const orderItemSchema = new mongoose.Schema<IOrderItem>({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
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

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("order", orderSchema);

export default Order;
