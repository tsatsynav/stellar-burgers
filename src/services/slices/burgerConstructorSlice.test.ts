import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  price: 50,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

describe('burgerConstructor slice', () => {
  it('should add bun ingredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient(mockBun);
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.bun).toMatchObject({ ...mockBun, id: expect.any(String) });
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should add main ingredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient(mockMain);
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      ...mockMain,
      id: expect.any(String)
    });
  });

  it('should remove ingredient by id', () => {
    const existing: TConstructorIngredient = { ...mockMain, id: '123' };
    const initialState = { bun: null, ingredients: [existing] };
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient('123')
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should move ingredient up', () => {
    const ing1 = { ...mockMain, id: '1' };
    const ing2 = { ...mockMain, id: '2' };
    const initialState = { bun: null, ingredients: [ing1, ing2] };
    const newState = burgerConstructorReducer(
      initialState,
      moveIngredientUp(1)
    );
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  it('should move ingredient down', () => {
    const ing1 = { ...mockMain, id: '1' };
    const ing2 = { ...mockMain, id: '2' };
    const initialState = { bun: null, ingredients: [ing1, ing2] };
    const newState = burgerConstructorReducer(
      initialState,
      moveIngredientDown(0)
    );
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  it('should clear constructor', () => {
    const initialState = {
      bun: { ...mockBun, id: 'b1' },
      ingredients: [{ ...mockMain, id: 'm1' }]
    };
    const newState = burgerConstructorReducer(initialState, clearConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });
});
