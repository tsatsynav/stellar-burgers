import orderReducer, { postOrder, closeOrderModal } from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrderResponse = {
  success: true,
  name: 'Test Burger',
  order: {
    _id: '1',
    status: 'done',
    name: 'Test Burger',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ing1', 'ing2'],
    owner: {
      name: 'John',
      email: 'john@test.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    price: 500
  }
};

describe('order slice', () => {
  it('should set orderRequest true on pending', () => {
    const state = orderReducer(undefined, postOrder.pending('', ['1']));
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set orderModalData and orderRequest false on fulfilled', () => {
    const action = postOrder.fulfilled(mockOrderResponse, '', ['1']);
    const state = orderReducer(undefined, action);
    expect(state.orderRequest).toBe(false);
    // Проверяем, что данные заказа скопированы, но ingredients заменён на []
    expect(state.orderModalData).toEqual({
      ...mockOrderResponse.order,
      ingredients: []
    });
  });

  it('should set error and orderRequest false on rejected', () => {
    const error = new Error('Order failed');
    const state = orderReducer(undefined, postOrder.rejected(error, '', ['1']));
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Order failed');
  });

  it('should close modal', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: { number: 1 } as TOrder,
      error: null
    };
    const newState = orderReducer(initialState, closeOrderModal());
    expect(newState.orderModalData).toBeNull();
  });
});
