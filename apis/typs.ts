export interface roomsParams {
  name: string
  price?: number
  rating?: number
}

export interface roomsModel {
  name: string
  price: number
  rating: number
  _id: string
  createdAt: string
}

// apis/types.ts
export interface Session {
  _id: string;
  sessionName: string;
  sessionTime: string;
  sessionPlace: string;
  sessionSalesPeriod: string;
  orderId: string[];
  sessionState: string;
  bookTicket: number;
  enterVenue: number;
  seatsTotal: number;
  detailEventUrl: string;
  seatsAvailable: number;
  isSoldOut: boolean;
  createdAt: string;
  updatedAt: string;
  sessionSetting: any[];
  areaSetting: any[];
  __v: number;
  notifyId: any[];
}

// apis/typs.ts
export interface Event {
  tagId: string[];
  _id: string;
  eventName: string;
  eventDate: string;
  eventPic: string;
  coverPic: string;
  smallBanner: string;
  releaseDate: string;
  eventIntro: string;
  sponsorId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: number;
  categoryList: string;
  sessionList: any[];  // Assuming any[] as we don't have detailed structure
  tagList: string[];
}


export type roomId = string
