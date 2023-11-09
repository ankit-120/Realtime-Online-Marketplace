import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.login = payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
