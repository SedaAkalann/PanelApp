import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

// Mevcut ürünleri getir
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("API'den veri çekilemedi:", error);
    }
  }
);

// Yeni ürün ekle
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      return response.data;
    } catch (error) {
      console.error("Ürün eklenemedi:", error);
    }
  }
);

// Ürün sil
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      return productId;
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  }
);

// Ürün güncelle
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await axios.put(`${API_URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      console.error("Ürün güncellenemedi:", error);
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      });
  },
});

export default productSlice.reducer;
