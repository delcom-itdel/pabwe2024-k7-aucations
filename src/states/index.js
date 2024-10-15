import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";

import {
  auctionsReducer,
  isAddAuctionReducer,
  isDeleteAuctionReducer,
  detailAuctionReducer,
} from "./auctions/reducer"; // Tambahkan ini

const store = configureStore({
  reducer: {
    // Auth
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    // Profile
    isUserChangePhoto: isUserChangePhotoReducer,

    // Auction
    auctions: auctionsReducer, // Tambahkan ini
    isAddAuction: isAddAuctionReducer, // Tambahkan ini
    isDeleteAuction: isDeleteAuctionReducer, // Tambahkan ini
    detailAuction: detailAuctionReducer, // Tambahkan ini
  },
});
export default store;
