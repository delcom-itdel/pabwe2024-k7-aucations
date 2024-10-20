import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAuctions } from "../states/auctions/action";
import AuctionList from "../components/AuctionList";

function HomePage({ selectedAuctionType }) {
  const dispatch = useDispatch();
  const { authLogin = null, auctions = [] } = useSelector((states) => states);

  const userId = authLogin?.id;

  useEffect(() => {
    dispatch(asyncGetAuctions());
  }, [dispatch]);

  const myAuctions = auctions.filter((auction) => auction.user_id === userId);
  const otherAuctions = auctions.filter(
    (auction) => auction.user_id !== userId
  );

  const displayedAuctions =
    selectedAuctionType === "myAuctions"
      ? myAuctions
      : selectedAuctionType === "otherAuctions"
      ? otherAuctions
      : auctions;

  return (
    <section style={{ padding: "2rem 0" }}>
      <div className="container">
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: "2rem",
          }}
        >
          {selectedAuctionType === "myAuctions"
            ? "My Auctions"
            : selectedAuctionType === "otherAuctions"
            ? "Other Auctions"
            : "All Auctions"}
        </h4>
        {displayedAuctions.length > 0 ? (
          <AuctionList auctions={displayedAuctions} />
        ) : (
          <p style={{ textAlign: "center" }}>No auctions available</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
