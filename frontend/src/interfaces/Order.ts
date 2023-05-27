export interface IOrder {
  _id: string;
  userId: string;
  restaurantName: string;
  address: string;
  distance: number;
  mentions?: string;
  items: IOrderItem[];
  deliveryFee: number;
  extraDeliveryFee: number;
  status: "confirming" | "preparing" | "delivering" | "rejected" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  _id: string;
  menuId: string;
  name: string;
  price: number;
  quantity: number;
}
