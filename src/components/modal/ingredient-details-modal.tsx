import { FC, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { IngredientDetails } from '../../components/ingredient-details';

export const IngredientDetailsModal: FC = memo(() => {
  const navigate = useNavigate();
  return (
    <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  );
});
