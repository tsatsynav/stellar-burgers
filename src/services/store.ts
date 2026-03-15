import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';
import websocketReducer, {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './slices/websocketSlice';
import { websocketMiddleware } from './middleware/websocketMiddleware';

// Константы для WebSocket экшенов
export const WS_CONNECT = 'websocket/connect';
export const WS_DISCONNECT = 'websocket/disconnect';

export const wsConnect = (url: string): UnknownAction => ({
  type: WS_CONNECT,
  payload: url
});

export const wsDisconnect = (): UnknownAction => ({
  type: WS_DISCONNECT
});

const wsActions = {
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage
};

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    feed: feedReducer,
    orders: ordersReducer,
    order: orderReducer,
    auth: authReducer,
    websocket: websocketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware(wsActions)),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
