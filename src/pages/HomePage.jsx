import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAuctions } from "../states/auctions/action";
import AuctionList from "../components/AuctionList";

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, auctions = [] } = useSelector((states) => states);

  const userId = authLogin?.id;

  const [selectedAuctionType, setSelectedAuctionType] = useState("myAuctions");

  useEffect(() => {
    dispatch(asyncGetAuctions());
  }, [dispatch]);

  const myAuctions = auctions.filter((auction) => auction.user_id === userId);
  const otherAuctions = auctions.filter(
    (auction) => auction.user_id !== userId
  );

  const handleAuctionTypeChange = (type) => {
    setSelectedAuctionType(type);
  };

  const buttonStyle = {
    backgroundColor: "#07575B",
    color: "white",
    border: "1px solid #07575B",
    flex: 1,
    margin: "5px",
    padding: "10px",
    borderRadius: "20px", // Membuat ujung tombol bulat
  };

  const selectedButtonStyle = {
    backgroundColor: "#054F51", // Warna lebih gelap untuk tombol terpilih
    color: "white",
    border: "1px solid #054F51",
    flex: 1,
    margin: "5px",
    padding: "10px",
    borderRadius: "20px", // Membuat ujung tombol bulat
  };

  const containerStyle = {
    display: "flex", // Menggunakan flexbox untuk meratakan tombol
    width: "100%", // Membuat tombol memenuhi lebar container
  };

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3>
          </div>
        </div>

        {/* Button Group dengan full width */}
        <div style={containerStyle} className="mb-4">
          <button
            type="button"
            style={
              selectedAuctionType === "myAuctions"
                ? selectedButtonStyle
                : buttonStyle
            }
            className="btn"
            onClick={() => handleAuctionTypeChange("myAuctions")}
          >
            Lelang Saya
          </button>
          <button
            type="button"
            style={
              selectedAuctionType === "otherAuctions"
                ? selectedButtonStyle
                : buttonStyle
            }
            className="btn"
            onClick={() => handleAuctionTypeChange("otherAuctions")}
          >
            Lelang dari Orang Lain
          </button>
        </div>

        {selectedAuctionType === "myAuctions" ? (
          <div>
            <h4>Lelang Saya</h4>
            {myAuctions.length > 0 ? (
              <AuctionList auctions={myAuctions} />
            ) : (
              <p>Kamu belum membuat lelang</p>
            )}
          </div>
        ) : (
          <div>
            <h4>Lelang dari Orang Lain</h4>
            {otherAuctions.length > 0 ? (
              <AuctionList auctions={otherAuctions} />
            ) : (
              <p>Tidak ada lelang dari orang lain</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;
