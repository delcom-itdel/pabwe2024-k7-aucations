import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link untuk navigasi ke halaman edit
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDetailAuction,
  asyncDeleteAuction,
} from "../states/auctions/action";
import AuctionDetail from "../components/AuctionDetail";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialogs

function AuctionDetailPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate(); // Untuk navigasi
  const dispatch = useDispatch();

  const {
    authLogin = null,
    detailAuction = null,
    loading,
  } = useSelector((states) => ({
    detailAuction: states.detailAuction,
    loading: states.loading, // Optional: loading state
    authLogin: states.authLogin, // Ensure you have user data
  }));

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id)); // Fetch auction details
    }
  }, [id, dispatch]);

  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${detailAuction.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteAuction(id)); // Delete the auction
        navigate("/"); // Navigate back to homepage after deletion
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading if fetching data
  }

  return (
    <section>
      <div className="container pt-1">
        {detailAuction ? (
          <>
            <AuctionDetail auction={detailAuction} />
            {/* Tampilkan tombol jika user login adalah pemilik auction */}
            {authLogin && detailAuction.user_id === authLogin.id && (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger mt-3"
                >
                  Hapus Lelang
                </button>
                <Link
                  to={`/auctions/edit/${id}`} // Navigasi ke halaman edit
                  className="btn btn-primary mt-3 ms-2"
                >
                  Edit Lelang
                </Link>
              </>
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
