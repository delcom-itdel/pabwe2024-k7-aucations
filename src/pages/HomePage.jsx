import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAuctions } from "../states/auctions/action"; // Hapus asyncDeleteAuction jika tidak digunakan di sini
import AuctionList from "../components/AuctionList";
import Swal from "sweetalert2"; // Assuming you are using SweetAlert for notifications

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, auctions = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncGetAuctions()); // Fetch all auctions when the component loads
  }, [dispatch]);

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3>
          </div>
        </div>

        {auctions.length > 0 ? (
          <AuctionList auctions={auctions} />
        ) : (
          <p>No auctions available</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
