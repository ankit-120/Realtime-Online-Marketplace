import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    password: "",
    soldItems: [],
    purchasedItems: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
