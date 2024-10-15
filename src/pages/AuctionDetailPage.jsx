import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailAuction } from "../states/auctions/action"; // Action untuk mengambil detail auction
import AuctionDetail from "../components/AuctionDetail"; // Komponen untuk menampilkan detail Auction

function AuctionDetailPage() {
  const { id } = useParams(); // Mengambil ID auction dari URL
  const { detailAuction = null } = useSelector((states) => states); // Selector untuk mendapatkan detail auction dari state
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id)); // Dispatch action untuk mengambil detail auction
    }
  }, [id, dispatch]);

  return (
    <section>
      <div className="container pt-1">
        {detailAuction != null ? (
          <AuctionDetail auction={detailAuction} />
        ) : null}{" "}
        {/* Menampilkan detail auction jika ada */}
      </div>
    </section>
  );
}

export default AuctionDetailPage;
