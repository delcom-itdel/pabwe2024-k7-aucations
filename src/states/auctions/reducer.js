import { ActionType } from "./action";

function auctionsReducer(auctions = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AUCTIONS:
      console.log("Auctions data diterima:", action.payload.auctions);
      return action.payload.auctions;
    default:
      return auctions;
  }
}

function isAddAuctionReducer(status = false, action = {}) {
  console.log("Reducer ADD_AUCTION dipanggil:", action);
  switch (action.type) {
    case ActionType.ADD_AUCTION:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteAuctionReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_AUCTION:
      return action.payload.status;
    default:
      return status;
  }
}

function detailAuctionReducer(auction = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_AUCTION:
      return action.payload.auction;

    case ActionType.ADD_BID:
      return {
        ...auction,
        bids: [...auction.bids, action.payload.bid], // Tambahkan bid baru ke dalam array bids
      };

    default:
      return auction;
  }
}

export {
  auctionsReducer,
  isAddAuctionReducer,
  isDeleteAuctionReducer,
  detailAuctionReducer,
};
