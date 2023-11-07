import { Product } from "@/utils/Types";
import { createSlice } from "@reduxjs/toolkit";

interface Type {
  keyword: string;
  singleProduct: Product;
}

const initialState: Type = {
  keyword: "",
  singleProduct: {
    _id: "",
    description: "",
    image: "",
    isSold: false,
    name: "",
    price: 0,
    seller: "",
    isAddedToAuction: false,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
    setSingleProduct: (state, { payload }) => {
      state.singleProduct = payload;
    },
  },
});

export const { setKeyword, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;
