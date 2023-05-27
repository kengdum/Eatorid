import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import httpErrors from "http-errors";

class OrdersController {
  public async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const totalCount = await Order.countDocuments({ userId });
      const orders = await Order.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);

      res.send({ orders, nextPage: page * limit < totalCount ? page + 1 : undefined });
    } catch (err) {
      next(err);
    }
  }

  public async placeOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body;

      const newOrder = new Order({
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

      await newOrder.save();

      res.send({ message: "Order placed!!!" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      res.send({ orders: allOrders });
    } catch (err) {
      next(err);
    }
  }

  public async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      if (!["confirming", "preparing", "delivering", "rejected", "completed"].includes(req.body.data.val))
        throw httpErrors.BadRequest("Very bad request 😤");

      await Order.updateOne({ _id: req.body.data.orderId }, { $set: { status: req.body.data.val } });

      res.send({ message: "Updated!" });
    } catch (err) {
      next(err);
    }
  }
}

export default new OrdersController();
