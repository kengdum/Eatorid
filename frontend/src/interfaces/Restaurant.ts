export interface ISchedule {
  opening: string | null;
  closing: string | null;
}

export interface IRestaurant {
  _id: string;
  name: string;
  schedule: [ISchedule, ISchedule, ISchedule, ISchedule, ISchedule, ISchedule, ISchedule];
  minimumOrder: number;
  deliveryMaxDistance: number;
  deliveryPrice: number;
  extraDeliveryFee: number;
  d: [string, string, string];
  fill: [string, string, string];
}

export interface IMenu {
  _id: string;
  restaurant: string;
  name: string;
  description: string;
  price: number;
}
