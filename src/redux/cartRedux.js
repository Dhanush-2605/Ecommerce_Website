import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    emptyCart: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
    itemAddHandler: (state, action) => {
      //  console.log(action.payload);
      console.log(state.products);
      // state.products[action.payload].quantity+=1;
    },
    itemRemoveHandler: (state) => {},
  },
});

export const { addProduct, emptyCart, itemAddHandler } = cartSlice.actions;

export default cartSlice.reducer;
