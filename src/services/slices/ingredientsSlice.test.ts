import ingredientsReducer, { getIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
      image: '',
      image_large: '',
      image_mobile: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0
    }
  ];

  it('should set loading true on pending', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set ingredients and loading false on fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('should set error and loading false on rejected', () => {
    const error = new Error('Server error');
    const state = ingredientsReducer(
      undefined,
      getIngredients.rejected(error, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Server error');
  });
});
