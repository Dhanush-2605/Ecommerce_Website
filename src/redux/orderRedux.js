import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      console.log(action.payload);

      state.orders = action.payload;
    },
    cancelOrder: (state) => {
      state.orders = [];
    },
  },
});
export const { addOrder, cancelOrder } = orderSlice.actions;

export default orderSlice.reducer;
