import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../facilities/userSlice";
import productReducer from "../facilities/productSlice";
import loginReducer from "../facilities/loginSlice";
import auctionReducer from "../facilities/auctionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    login: loginReducer,
    auction: auctionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
