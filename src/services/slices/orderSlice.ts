import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => await orderBurgerApi(data)
);

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        const { order } = action.payload;
        // Создаём объект, совместимый с TOrder (добавляем ingredients)
        state.orderModalData = {
          ...order,
          ingredients: [] // для совместимости с типом TOrder
        };
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
