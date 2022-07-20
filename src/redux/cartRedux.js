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
      state.total += action.payload.price*action.payload.quantity;
    },
    emptyCart:(state)=>{
      state.products=[];
      state.total=0;
      state.quantity=0;
    },
    quantityHandler:(state,action)=>{

       console.log(action.payload);
      // state.products[action.payload].quantity+=1;

    }
  },
});



export const { addProduct,emptyCart}=cartSlice.actions;

export default cartSlice.reducer;