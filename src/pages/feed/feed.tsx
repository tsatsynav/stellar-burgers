import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { WS_ALL_ORDERS_URL } from '../../utils/websocket';
import { wsConnect, wsDisconnect } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday, isConnected } = useSelector(
    (state) => state.websocket
  );

  useEffect(() => {
    dispatch(wsConnect(WS_ALL_ORDERS_URL));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  if (!isConnected || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(wsConnect(WS_ALL_ORDERS_URL))}
    />
  );
};
