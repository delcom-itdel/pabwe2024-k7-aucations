import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddAuction,
  addAuctionActionCreator,
} from "../states/auctions/action"; // Import action untuk Auction
import AuctionInput from "../components/AuctionInput"; // Input form untuk Auction
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Make sure you have this import for

function AuctionAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddAuction = false } = useSelector((states) => states.isAddAuction); // Selector untuk melihat status tambah Auction

  useEffect(() => {
    console.log("isAddAuction:", isAddAuction);
    if (isAddAuction) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Auction berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(addAuctionActionCreator(false)); // Reset status add auction
    }
  }, [isAddAuction, navigate, dispatch]);

  const onAddAuction = ({
    title,
    description,
    start_bid,
    closed_at,
    cover,
  }) => {
    dispatch(
      asyncAddAuction(
        { title, description, start_bid, closed_at, cover },
        navigate
      ) // Pass navigate to the action
    );
  };

  return (
    <section>
      <div className="container pt-1">
        <AuctionInput onAddAuction={onAddAuction} />{" "}
        {/* Komponen form input untuk Auction */}
      </div>
    </section>
  );
}

export default AuctionAddPage;
