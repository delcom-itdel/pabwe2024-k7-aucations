import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";
import Swal from "sweetalert2";

const ActionType = {
  GET_AUCTIONS: "GET_AUCTIONS",
  ADD_AUCTION: "ADD_AUCTION",
  DELETE_AUCTION: "DELETE_AUCTION",
  DETAIL_AUCTION: "DETAIL_AUCTION",
  ADD_BID: "ADD_BID",
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

function addBidActionCreator(bid) {
  return {
    type: ActionType.ADD_BID,
    payload: {
      bid,
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
      Swal.fire("Success", "Auction updated successfully", "success");

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
    Swal.fire("Success", "Auction delete successfully", "success");
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

function asyncEditAuction(
  { id, title, description, start_bid, closed_at },
  navigate
) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // Memanggil API untuk mengupdate auction
      await api.putUpdateAuction({
        id,
        title,
        description,
        start_bid,
        closed_at,
      });

      // Setelah berhasil, panggil detail auction kembali
      dispatch(asyncDetailAuction(id)); // Memuat ulang detail auction yang sudah diedit
      Swal.fire("Success", "Auction updated successfully", "success");

      // Panggil navigate untuk kembali ke halaman detail setelah update berhasil
      navigate("/");
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeAuctionCover({ id, cover }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postChangeAuctionCover({ id, cover });
      dispatch(asyncDetailAuction(id)); // Reload auction details after changing cover
      Swal.fire("Success", "Cover updated successfully", "success");
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddBid({ id, bid }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // Panggil API untuk menambah bid
      await api.postAddBid({ id, bid });

      // Tampilkan pesan sukses
      Swal.fire(
        "Success",
        "Berhasil memberikan tawaran pada lelang",
        "success"
      );

      // Update state dengan bid yang baru
      dispatch(addBidActionCreator({ id, bid }));
    } catch (error) {
      // Tampilkan pesan error
      Swal.fire("Error", error.message, "error");
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteBid({ id }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteBid({ id });
      // Tampilkan pesan sukses
      Swal.fire("Success", "Berhasil menghapus tawaran pada lelang", "success");
      // Perbarui detail auction setelah penghapusan bid
      dispatch(asyncDetailAuction(id));
    } catch (error) {
      // Tampilkan pesan error jika gagal
      Swal.fire("Error", error.message, "error");
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
  asyncEditAuction,
  asyncChangeAuctionCover,
  asyncAddBid,
  asyncDeleteBid,
};
