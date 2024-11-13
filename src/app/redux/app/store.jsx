import { configureStore } from "@reduxjs/toolkit";
// import { productSlice } from "../feature/product/productSlice";
import productReducer from '../feature/product/productSlice'; 
// ./feature/product/productSlice

export const store=configureStore({
    reducer:{
        product: productReducer
    }
})