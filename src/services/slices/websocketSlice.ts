import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface WebSocketState {
  status: WebsocketStatus;
  connectionError: string | null;
  orders: TWSOrder[];
  total: number | null;
  totalToday: number | null;
  isConnected: boolean;
}

const initialState: WebSocketState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: null,
  orders: [],
  total: null,
  totalToday: null,
  isConnected: false
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
      state.isConnected = false;
      state.connectionError = null;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.isConnected = true;
      state.connectionError = null;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
      state.isConnected = false;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.status = WebsocketStatus.OFFLINE;
      state.connectionError = action.payload;
      state.isConnected = false;
    },
    wsMessage: (state, action: PayloadAction<TWSResponse>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  websocketSlice.actions;

export default websocketSlice.reducer;
