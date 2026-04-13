//export const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders';
export const WS_BASE_URL = 'wss://norma.education-services.ru/orders';
export const WS_ALL_ORDERS_URL = `${WS_BASE_URL}/all`;
export const WS_USER_ORDERS_URL = WS_BASE_URL;

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type TWSOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TWSResponse = {
  success: boolean;
  orders: TWSOrder[];
  total: number;
  totalToday: number;
};
