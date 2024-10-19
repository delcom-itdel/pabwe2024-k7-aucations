import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncDetailAuction,
  asyncDeleteAuction,
  asyncChangeAuctionCover, // Pastikan asyncChangeAuctionCover diimpor
} from "../states/auctions/action";
import AuctionDetail from "../components/AuctionDetail";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialogs

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

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id));
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
        dispatch(asyncDeleteAuction(id));
        navigate("/"); // Navigate back to homepage after deletion
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container pt-1">
        {detailAuction ? (
          <>
            <AuctionDetail auction={detailAuction} />
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
                  to={`/auctions/edit/${id}`}
                  className="btn btn-primary mt-3 ms-2"
                >
                  Edit Lelang
                </Link>

                {/* Input untuk mengganti cover */}
                <div className="mb-3 mt-3">
                  <label htmlFor="coverInput" className="form-label">
                    Ubah Cover Lelang:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="coverInput"
                    onChange={handleCoverChange} // Hubungkan fungsi handleCoverChange
                  />
                  <button
                    onClick={handleChangeCover}
                    className="btn btn-primary mt-2"
                  >
                    Ubah Cover
                  </button>
                </div>
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
