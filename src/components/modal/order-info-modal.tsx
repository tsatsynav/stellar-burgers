import { FC, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { OrderInfo } from '../../components/order-info';

export const OrderInfoModal: FC = memo(() => {
  const { number } = useParams();
  const navigate = useNavigate();
  return (
    <Modal title={`Заказ #${number}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
});
