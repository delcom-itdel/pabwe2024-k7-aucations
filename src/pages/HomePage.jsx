import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetAuctions,
  asyncDeleteAuction,
  deleteAuctionActionCreator,
} from "../states/auctions/action";
import AuctionList from "../components/AuctionList";
import { useNavigate } from "react-router-dom"; // Tambahkan ini untuk navigasi
//import Swal from "sweetalert2"; // Assuming you are using SweetAlert for notifications

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Gunakan hook useNavigate untuk navigasi
  const {
    authLogin = null,
    auctions = [],
    isDeleteAuction = false,
  } = useSelector((states) => states);

  useEffect(() => {
    if (isDeleteAuction) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Auction successfully deleted!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteAuctionActionCreator(false)); // Reset the delete state
      navigate("/"); // Navigasi ke homepage setelah penghapusan sukses
    }
    dispatch(asyncGetAuctions()); // Fetch all auctions when the component loads
  }, [dispatch, isDeleteAuction, navigate]);

  const onDeleteAuction = (id) => {
    dispatch(asyncDeleteAuction(id, navigate)); // Tambahkan navigate sebagai argumen
  };

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3>
          </div>
        </div>

        {/* Display list of auctions */}
        {auctions.length > 0 ? (
          <AuctionList auctions={auctions} onDeleteAuction={onDeleteAuction} />
        ) : (
          <p>No auctions available</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
