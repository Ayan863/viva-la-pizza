import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import React from 'react'


const initialState={
    value: [],
    loading:false
}
export const getProduct = createAsyncThunk("getProduct",async()=>{
    const {data}= await axios.get("https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza")
    return data
    
})

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza",
        newProduct
      );
      return response.data; // Əlavə olunan məhsulu qaytarır
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (updatedProduct, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza/${updatedProduct.id}`,
        updatedProduct
      );
      return response.data; // Yenilənmiş məhsulu qaytarır
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message); // Səhv mesajını qaytarır
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    const response = await fetch(`https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Silme işlemi başarısız!");
    }
    return id; // Silinen ürünün ID'sini döner
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getProduct.pending, (state) => {
              state.loading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
              state.value = action.payload;
              state.loading = false;
          })
          .addCase(getProduct.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
          .addCase(deleteProduct.pending, (state) => {
              state.loading = true;
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
              state.value = state.value.filter((item) => item.id !== action.payload);
              state.loading = false;
          })
          .addCase(deleteProduct.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
          .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.value.push(action.payload); // Yeni məhsul əlavə olunur
            state.loading = false;
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(editProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
          const index = state.value.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.value[index] = action.payload; // Yenilənmiş məhsulu əvəz edirik
          }
          state.loading = false;
        })
        .addCase(editProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
  },
});

export default productSlice.reducer
