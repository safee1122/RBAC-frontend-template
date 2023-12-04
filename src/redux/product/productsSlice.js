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
    addProduct: (state, action) => {
      state.allProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(
        (product) => product._id != action.payload,
      );
    },
    updateProduct: (state, action) => {
      state.allProducts = state.allProducts.map((product) => {
        if ((product._id == action.payload._id)) {
          product = action.payload;
        }
        return product;
      });
    },
  },
});

export const { saveAllProducts, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;

export const getProducts = (state) => state.products.allProducts;

export default productSlice.reducer;
