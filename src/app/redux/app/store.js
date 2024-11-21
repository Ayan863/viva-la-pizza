import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../feature/product/ProductSlice.js";
import MenuSlice from "../feature/menu/MenuSlice.jsx";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    menu: MenuSlice
  },
});
