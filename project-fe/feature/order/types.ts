export type ICreateOrderModal = {
  products: {
    productId: string | any; // Can be populated object or string ID
    quantity: number;
    unitPrice: number;
  }[];
  _id: any;
  supplier: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: string;
  note: string;
  createdAt?: string;
  _orderedBy?: any;
};

export type IOrderDirectionBody = {
  origin: string;
  destination: string;
};
export type INearbyPlaceBody = {
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  type: string;
};
