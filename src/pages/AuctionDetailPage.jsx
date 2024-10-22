import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDetailAuction,
  asyncDeleteAuction,
  asyncChangeAuctionCover,
  asyncAddBid,
  asyncDeleteBid,
} from "../states/auctions/action";
import AuctionDetail from "../components/AuctionDetail";
import Swal from "sweetalert2";

function AuctionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authLogin, detailAuction, loading } = useSelector((states) => ({
    detailAuction: states.detailAuction,
    loading: states.loading,
    authLogin: states.authLogin,
  }));

  const [selectedCover, setSelectedCover] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id));
    }
  }, [id, dispatch]);

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Auction",
      text: `Are you sure to delete this auction : ${detailAuction.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete auction",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteAuction(id));
        navigate("/"); // Navigate kembali ke halaman utama sesudah delete
      }
    });
  };

  // Definisikan fungsi handleCoverChange
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCover(file);
    }
  };

  const handleChangeCover = () => {
    if (selectedCover) {
      dispatch(asyncChangeAuctionCover({ id, cover: selectedCover }))
        .then(() => {
          Swal.fire("Success", "Auction cover updated successfully", "success");
          navigate("/"); // Kembali ke halaman utama setelah berhasil
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    } else {
      Swal.fire("Error", "Please select a cover to upload", "error");
    }
  };

  const handleAddBid = async () => {
    const currentDateTime = new Date();
    const closedDateTime = new Date(detailAuction.closed_at);
    const startBid = detailAuction.start_bid;
    const highestBid = detailAuction?.bids.length
      ? Math.max(...detailAuction.bids.map((bid) => bid.bid))
      : startBid;

    if (detailAuction.bids.length > 0) {
      if (bidAmount <= highestBid) {
        Swal.fire(
          "Ups, something went wrong",
          "The bid must be HIGHER than the highest bid",
          "error"
        );
        return;
      }
    }

    // Validasi bid
    if (bidAmount <= 0) {
      Swal.fire(
        "Ups, something wrong",
        "Please enter a valid bid amount",
        "error"
      );
      return;
    }

    if (bidAmount <= startBid) {
      Swal.fire(
        "Ups, something went wrong",
        "The bid must be HIGHER than the starting bid",
        "error"
      );
      return;
    }

    if (currentDateTime > closedDateTime) {
      Swal.fire(
        "Ups, something went wrong",
        "The auction is CLOSED, you can't place a bid",
        "error"
      );
      return;
    }

    // Jika semua validasi berhasil, tambahkan bid
    await dispatch(asyncAddBid({ id, bid: bidAmount }));

    Swal.fire("Success", "Bid successfully added", "success");

    // Memuat ulang detail lelang untuk menampilkan data terbaru
    await dispatch(asyncDetailAuction(id));
  };

  const handleDeleteBid = () => {
    Swal.fire({
      title: "Delete Bid",
      text: `Are you sure to delete your bid on this auction?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete bid",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteBid({ id }));
      }
    });
  };

  const highestBid = detailAuction?.bids.length
    ? Math.max(...detailAuction.bids.map((bid) => bid.bid))
    : null;

  const myBid = detailAuction?.my_bid ? detailAuction.my_bid.bid : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container pt-1">
        {detailAuction ? (
          <>
            <AuctionDetail auction={detailAuction} />
            {highestBid !== null && (
              <div className="mt-3">
                <h5>Highest Bid: Rp {highestBid.toLocaleString()}</h5>
              </div>
            )}

            {myBid !== null && (
              <div className="mt-3">
                <h5>Your Bid: Rp {myBid.toLocaleString()}</h5>
                <button
                  onClick={handleDeleteBid}
                  className="btn btn-danger mt-2"
                >
                  Delete Bid
                </button>
              </div>
            )}

            {authLogin && detailAuction.user_id === authLogin.id ? (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger mt-3"
                >
                  Delete Auction
                </button>
                <Link
                  to={`/auctions/edit/${id}`}
                  className="btn btn-primary mt-3 ms-2"
                  style={{
                    backgroundColor: "#07575B",
                    borderColor: "#07575B",
                    color: "#fff",
                  }}
                >
                  Edit Auction
                </Link>

                {/* Input untuk mengganti cover */}
                <div className="mb-3 mt-3">
                  <label htmlFor="coverInput" className="form-label">
                    Change Auction Cover:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="coverInput"
                    onChange={handleCoverChange}
                  />
                  <button
                    onClick={handleChangeCover}
                    className="btn btn-primary mt-2"
                    style={{
                      backgroundColor: "#07575B",
                      borderColor: "#07575B",
                      color: "#fff",
                    }}
                  >
                    Change Cover
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3">
                <h5>Increase Bid</h5>
                <input
                  type="number"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                />
                <button onClick={handleAddBid} className="btn btn-success mt-2">
                  Place Bid
                </button>
              </div>
            )}
          </>
        ) : (
          <div>Auction not found.</div>
        )}
      </div>
    </section>
  );
}

export default AuctionDetailPage;
