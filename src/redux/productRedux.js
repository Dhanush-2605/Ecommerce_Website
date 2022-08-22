import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
    },
    reducers:{
        addCurProduct:(state,action)=>{
            state.products=action.payload;
        },
        updateReview:(state,action)=>{
            state.products.reviews=action.payload;

        }
    }

})

export const {addCurProduct,updateReview}=productSlice.actions;

export default productSlice.reducer;