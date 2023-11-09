import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auctionInfo: {
    _id: "",
    item: {
      _id: "",
      description: "",
      image: "",
      isSold: false,
      name: "",
      price: 0,
      seller: "",
      isAddedToAuction: false,
    },
    bidIncrement: 0,
    timeLimit: 0,
    endTime: "",
    startingPrice: 0,
    seller: "",
    isSold: false,
  },
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setAuctionInfo: (state, { payload }) => {
      state.auctionInfo = payload;
    },
  },
});

export const { setAuctionInfo } = auctionSlice.actions;
export default auctionSlice.reducer;
