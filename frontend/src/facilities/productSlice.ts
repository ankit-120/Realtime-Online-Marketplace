import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
  },
});

export const { setKeyword } = productSlice.actions;
export default productSlice.reducer;
