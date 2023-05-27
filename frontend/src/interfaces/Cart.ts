export interface ICart {
  header: ICartHeader;
  items: ICartItem[];
  address: string;
  distance: number;
  mentions: string;
}

export interface ICartHeader {
  restaurantId: string;
  restaurantName: string;
  minimumOrder: number;
  deliveryMaxDistance: number;
  deliveryPrice: number;
  extraDeliveryFee: number;
}

export interface ICartItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
}
