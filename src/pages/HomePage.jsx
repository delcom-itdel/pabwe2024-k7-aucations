import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAuctions } from "../states/auctions/action"; // Action untuk mengambil semua auctions
import AuctionList from "../components/AuctionList"; // Komponen untuk menampilkan daftar auction

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, auctions = [] } = useSelector((states) => states); // Ambil auth dan auctions dari store

  useEffect(() => {
    console.log("cek auctions...");
    dispatch(asyncGetAuctions()); // Ambil semua auctions ketika halaman dimuat
  }, [dispatch]);

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3> {/* Menampilkan nama user */}
          </div>
        </div>

        {/* Menampilkan daftar auctions */}
        {auctions.length > 0 ? (
          <AuctionList auctions={auctions} onDeleteAuction={() => {}} /> // Daftar auctions
        ) : (
          <p>No auctions available</p> // Pesan jika tidak ada auction
        )}
      </div>
    </section>
  );
}

export default HomePage;
