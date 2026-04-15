import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
    addresses: [],
    selectedAddress: null, //currently choosen address
  },
  reducers: {
    //actions
    SetProducts: (state, action) => {
      state.products = action.payload;
    },
    SetCart: (state, action) => {
      state.cart = action.payload;
    },
    //address management
    addAddress: (state, action) => {
      if (!state.addresses) state.addresses = [];
      state.addresses.push(action.payload);
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (_, index) => index !== action.payload,
      );

      //reset selected address if it was deleted
      if (state.selectedAddress === action.payload) {
        state.selectedAddress = null;
      }
    },
  },
});

export const {
  SetProducts,
  SetCart,
  addAddress,
  setSelectedAddress,
  deleteAddress,
} = productSlice.actions;
export default productSlice.reducer;
