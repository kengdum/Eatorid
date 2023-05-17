export interface Schedule {
  open: {
    h: number;
    m: number;
  };
  close: {
    h: number;
    m: number;
  };
  closed: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  schedule: Schedule[];
  minimumOrder: number;
  deliveryMaxDistance: number;
  deliveryPrice: number;
  extraDeliveryFee: number;
  menu: Menu[];
}

export interface Menu {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
}
