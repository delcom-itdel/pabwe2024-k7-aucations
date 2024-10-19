import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6"; // Icon untuk penghapusan
import Swal from "sweetalert2"; // SweetAlert2 untuk dialog konfirmasi

function AuctionItem({ auction, onDeleteAuction }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${auction.title}?`,
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
        onDeleteAuction(auction.id);
      }
    });
  };

  return (
    <div className="card mb-4" style={{ height: "500px" }}>
      {" "}
      {/* Meningkatkan tinggi kartu */}
      {auction.cover && (
        <img
          src={auction.cover}
          className="card-img-top"
          alt={auction.title}
          style={{ maxHeight: "250px", objectFit: "cover" }} // Meningkatkan tinggi maksimum gambar
        />
      )}
      <div className="card-body d-flex flex-column">
        <Link to={`/auctions/${auction.id}`}>
          <h5 className="card-title">{auction.title}</h5>
        </Link>
        <p className="card-text">{auction.description}</p>
        <p className="card-text">Starting Bid: ${auction.start_bid}</p>
        <p className="card-text">
          Closing Date: {new Date(auction.closed_at).toLocaleDateString()}
        </p>
        <p className="card-text">Total Bids: {auction.bids.length}</p>

        {onDeleteAuction && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger mt-2"
          >
            <FaTrash /> Hapus
          </button>
        )}
      </div>
    </div>
  );
}

AuctionItem.propTypes = {
  auction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_bid: PropTypes.number.isRequired,
    closed_at: PropTypes.string.isRequired,
    cover: PropTypes.string,
    bids: PropTypes.array.isRequired,
  }).isRequired,
  onDeleteAuction: PropTypes.func,
};

export default AuctionItem;
