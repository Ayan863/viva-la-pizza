import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../feature/product/ProductSlice";
import MenuSlice from "../feature/menu/MenuSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    menu: MenuSlice
  },
});
