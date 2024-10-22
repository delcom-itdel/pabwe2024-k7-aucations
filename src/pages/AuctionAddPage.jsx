import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddAuction,
  addAuctionActionCreator,
} from "../states/auctions/action";
import AuctionInput from "../components/AuctionInput";
import { useNavigate } from "react-router-dom";

function AuctionAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddAuction = false } = useSelector((states) => states.isAddAuction);

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
      )
    );
  };

  return (
    <section>
      <div className="container pt-1">
        <AuctionInput onAddAuction={onAddAuction} />{" "}
      </div>
    </section>
  );
}

export default AuctionAddPage;
