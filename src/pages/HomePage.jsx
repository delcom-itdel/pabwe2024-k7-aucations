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
        {/* Greeting Card for logged-in users */}
        {authLogin && (
          <div
            className="card mb-4"
            style={{
              textAlign: "center",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#f8f9fa",
              transition: "transform 0.3s, box-shadow 0.3s",
              display: "flex", 
              flexDirection: "row", 
              alignItems: "center", 
              justifyContent: "space-between", 
              padding: "2rem",
            }}
          >
            {/* Left Image */}
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <img
                src="/assets/stiker2.jpg" 
                alt="Left Image"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            </div>

            {/* Greeting Text */}
            <div style={{ flex: "3", textAlign: "center" }}>
              <h5
                className="card-title"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "normal",
                  color: "#343a40",
                  textTransform: "none",
                  letterSpacing: "0.1rem",
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                  animation: "fade-zoom 3s ease-in-out forwards",
                }}
              >
                Welcome, {authLogin.name}!
              </h5>
              <p
                className="card-text"
                style={{ fontSize: "1.2rem", color: "#6c757d" }}
              >
                🎉 We are thrilled to have you! 🎉
              </p>
              <p
                className="card-text"
                style={{ fontSize: "1.2rem", color: "#6c757d" }}
              >
                Explore our diverse auction catalog and discover unique items!
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#343a40",
                }}
              >
                Happy bidding! 
              </p>
            </div>

            {/* Right Image */}
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <img
                src="/assets/stiker1.jpg" 
                alt="Right Image"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        )}

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
          <p style={{ textAlign: "center" }}>Tidak ada lelang yang tersedia</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
