import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { protectedInstance } from "../../../services/instance";

const initialState = {
  createProduct: {
    status: "idle",
    error: null,
    product: null,
  },
};

export const createProduct = createAsyncThunk(
  "/product/create",
  async (productName, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.post(
        "/product/create-product",
        productName
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.createProduct.status = "loading";
        state.createProduct.error = null;
        state.createProduct.product = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProduct.status = "succeeded";
        state.createProduct.product = action.payload;
        state.createProduct.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProduct.status = "failed";
        state.createProduct.error = action.payload;
        state.createProduct.product = null;
      });
  },
});

export default productSlice.reducer;

// selectors
export const selectCreateProductStatus = (state) =>
  state.product.createProduct.status;
export const selectCreateProductError = (state) =>
  state.product.createProduct.error;
export const selectCreateProduct = (state) =>
  state.product.createProduct.product;
