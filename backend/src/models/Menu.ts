import mongoose from "mongoose";

export interface IMenu extends mongoose.Document {
  restaurant: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
}

const menuSchema = new mongoose.Schema<IMenu>({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model<IMenu>("menu", menuSchema);

export default Menu;
