export interface Schedule {
  opening: string | null;
  closing: string | null;
}

export interface RestaurantInterface {
  name: string;
  schedule: Schedule[];
  minimumOrder: number;
  deliveryMaxDistance: number;
  deliveryPrice: number;
  extraDeliveryFee: number;
}

export interface Menu {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
}
