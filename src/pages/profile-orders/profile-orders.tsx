import { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { WS_USER_ORDERS_URL } from '../../utils/websocket';
import { wsConnect, wsDisconnect } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isConnected } = useSelector((state) => state.websocket);

  useEffect(() => {
    const token = getCookie('accessToken')?.replace('Bearer ', '');
    dispatch(wsConnect(`${WS_USER_ORDERS_URL}?token=${token}`));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  if (!isConnected) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
