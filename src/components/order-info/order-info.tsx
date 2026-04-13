import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const wsOrders = useSelector((state) => state.websocket.orders);

  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numericNumber = Number(number);
    const existingOrder = wsOrders.find((o) => o.number === numericNumber);
    if (existingOrder) {
      setOrder(existingOrder);
      setLoading(false);
    } else {
      getOrderByNumberApi(numericNumber)
        .then((data) => setOrder(data.orders[0]))
        .catch(() => setOrder(null))
        .finally(() => setLoading(false));
    }
  }, [number, wsOrders]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce<TIngredientsWithCount>(
      (acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (loading || !orderInfo) return <Preloader />;
  return <OrderInfoUI orderInfo={orderInfo} />;
};
