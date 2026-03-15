import { Middleware, MiddlewareAPI, UnknownAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from '../slices/websocketSlice';
import { TWSResponse } from '../slices/websocketSlice';

export type TWSActions = {
  wsConnect: string;
  wsDisconnect: string;
  onOpen: () => UnknownAction;
  onClose: () => UnknownAction;
  onError: (error: string) => UnknownAction;
  onMessage: (data: TWSResponse) => UnknownAction;
};

export const websocketMiddleware = (wsActions: TWSActions): Middleware =>
  ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action: UnknownAction) => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (action.type === wsConnect) {
        url = action.payload as string;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
          dispatch(wsOpen());
        };

        socket.onerror = (event) => {
          console.log('WebSocket error:', event);
          dispatch(onError('WebSocket error'));
          dispatch(wsError('WebSocket error'));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data) as TWSResponse;
          dispatch(onMessage(parsedData));
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log('WebSocket closed:', event);
            dispatch(onError(`WebSocket closed with code: ${event.code}`));
            dispatch(wsError(`WebSocket closed with code: ${event.code}`));
          }
          dispatch(onClose());
          dispatch(wsClose());

          if (isConnected && url) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnect, payload: url } as UnknownAction);
            }, 3000);
          }
        };
      }

      if (action.type === wsDisconnect && socket) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close(1000, 'Работа закончена');
        socket = null;
        dispatch(onClose());
        dispatch(wsClose());
      }

      next(action);
    };
  }) as Middleware;
