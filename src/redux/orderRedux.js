import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    Status: "",
  },
  reducers: {
    addOrder: (state, action) => {
      console.log(action.payload);

      state.orders = action.payload;
    },
    cancelOrder: (state) => {
      state.orders = [];
    },
    setStatus: (state, action) => {
      state.Status = action.payload;
    },
  },
});
export const { addOrder, cancelOrder, setStatus } = orderSlice.actions;

export default orderSlice.reducer;
