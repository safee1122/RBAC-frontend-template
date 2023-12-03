import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { saveAllProducts } = productSlice.actions;

export const getProducts = (state) => state.products.allProducts;

export default productSlice.reducer;
