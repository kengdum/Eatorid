export interface Schedule {
  opening: string | null;
  closing: string | null;
}

// export interface RestaurantInterface {
//   id?: string;
//   name: string;
//   schedule: [Schedule, Schedule, Schedule, Schedule, Schedule, Schedule, Schedule];
//   minimumOrder: number;
//   deliveryMaxDistance: number;
//   deliveryPrice: number;
//   extraDeliveryFee: number;
//   d: [string, string, string];
//   fill: [string, string, string];
// }

export interface Menu {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
}
