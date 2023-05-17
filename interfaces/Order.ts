export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  address: string;
  distance: number;
  items: OrderItem[];
  mentions: string;
  status: "confirming" | "preparing" | "delivering" | "delivered";
}

export interface OrderItem {
  menuId: string;
  price: number;
  quantity: number;
  mentions: string;
}
