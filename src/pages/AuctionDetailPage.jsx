import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailAuction } from "../states/auctions/action";
import AuctionDetail from "../components/AuctionDetail";

function AuctionDetailPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const { detailAuction = null, loading } = useSelector((states) => ({
    detailAuction: states.detailAuction,
    loading: states.loading, // Add loading state if necessary
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id)); // Fetch auction details
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading if still fetching data
  }

  return (
    <section>
      <div className="container pt-1">
        {detailAuction ? (
          <AuctionDetail auction={detailAuction} />
        ) : (
          <div>Auction not found.</div>
        )}
      </div>
    </section>
  );
}

export default AuctionDetailPage;
