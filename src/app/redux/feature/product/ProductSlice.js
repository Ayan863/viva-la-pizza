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
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(payload)=>{
        payload.addCase(getProduct.pending,(state,action)=>{
            state.loading=true
        }),
        payload.addCase(getProduct.fulfilled,(state,action)=>{
            state.value=action.payload
            state.loading=false
        })
    }
})
export default productSlice.reducer
