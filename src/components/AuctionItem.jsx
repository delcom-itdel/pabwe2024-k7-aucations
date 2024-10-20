import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

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

  const MAX_DESCRIPTION_LENGTH = 100;

  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return description;
  };

  return (
    <div
      className="card auction-item"
      style={{
        width: "100%",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        borderRadius: "0.5rem",
      }}
    >
      {auction.cover && (
        <img
          src={auction.cover}
          className="card-img-top"
          alt={auction.title}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "0.5rem 0.5rem 0 0",
          }}
        />
      )}
      <div
        className="card-body d-flex flex-column"
        style={{ padding: "1rem", flexGrow: 1 }}
      >
        <Link to={`/auctions/${auction.id}`} className="text-decoration-none">
          <h5
            className="card-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#000",
              marginBottom: "0.75rem",
            }}
          >
            {auction.title}
          </h5>
        </Link>

        <p className="card-text" style={{ color: "#6c757d", flexGrow: 1 }}>
          {truncateDescription(auction.description)}
        </p>

        <div>
          <p className="card-text" style={{ marginBottom: "0.5rem" }}>
            <strong>Starting Bid:</strong> IDR {auction.start_bid}
          </p>
          <p className="card-text" style={{ marginBottom: "0.5rem" }}>
            <strong>Closing Date:</strong>{" "}
            {new Date(auction.closed_at).toLocaleDateString()}
          </p>
          <p className="card-text" style={{ marginBottom: "0.5rem" }}>
            <strong>Total Bids:</strong> {auction.bids.length}
          </p>

          {onDeleteAuction && (
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
              style={{
                border: "1px solid red",
                backgroundColor: "transparent",
                color: "red",
              }}
            >
              <FaTrash /> Hapus
            </button>
          )}
        </div>
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
