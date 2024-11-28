import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: 1,
      title: "Home",
    },
    {
        id:2,
        title:"Services",

    },{
       id:3,
       title:"Order history", 
    },{
        id:4,
        title:"About Us"
    }

  ],
  activeItem: null,
};

export const menuSlice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});
export const { setActiveItem } = menuSlice.actions;
export default menuSlice.reducer;
