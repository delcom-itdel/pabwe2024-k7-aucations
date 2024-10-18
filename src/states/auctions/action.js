import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_AUCTIONS: "GET_AUCTIONS",
  ADD_AUCTION: "ADD_AUCTION",
  DELETE_AUCTION: "DELETE_AUCTION",
  DETAIL_AUCTION: "DETAIL_AUCTION",
};

function getAuctionsActionCreator(auctions) {
  return {
    type: ActionType.GET_AUCTIONS,
    payload: {
      auctions,
    },
  };
}

function addAuctionActionCreator(status) {
  return {
    type: ActionType.ADD_AUCTION,
    payload: {
      status,
    },
  };
}

function deleteAuctionActionCreator(status) {
  return {
    type: ActionType.DELETE_AUCTION,
    payload: {
      status,
    },
  };
}

function detailAuctionActionCreator(auction) {
  return {
    type: ActionType.DETAIL_AUCTION,
    payload: {
      auction,
    },
  };
}

function asyncGetAuctions() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const auctions = await api.getAllAuctions();
      console.log("Auctions fetched from API:", auctions);
      dispatch(getAuctionsActionCreator(auctions));
    } catch (error) {
      console.error("Error fetching auctions:", error);
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddAuction(
  { title, description, start_bid, closed_at, cover },
  navigate
) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddAuction({
        title,
        description,
        start_bid,
        closed_at,
        cover,
      });
      dispatch(addAuctionActionCreator(true));
      navigate("/"); // Redirect to homepage after successful addition
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteAuction(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteAuction(id);
      dispatch(deleteAuctionActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailAuction(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const auction = await api.getDetailAuction(id);
      dispatch(detailAuctionActionCreator(auction));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getAuctionsActionCreator,
  asyncGetAuctions,
  addAuctionActionCreator,
  asyncAddAuction,
  deleteAuctionActionCreator,
  asyncDeleteAuction,
  detailAuctionActionCreator,
  asyncDetailAuction,
};
