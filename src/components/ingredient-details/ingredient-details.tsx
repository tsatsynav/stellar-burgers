import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = memo(() => {
  const { id } = useParams();
  const ingredient = useSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
});
