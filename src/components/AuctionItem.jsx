import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6"; // Added import for trash icon
import Swal from "sweetalert2"; // SweetAlert2 for confirmation dialogs

function AuctionItem({ auction, onDeleteAuction }) {
  // Function to handle the delete confirmation
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${auction.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4", // Style for confirm button
        cancelButton: "btn btn-secondary mb-4", // Style for cancel button
      },
      buttonsStyling: false, // Disable SweetAlert2 default button styling
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteAuction(auction.id); // Call delete function if confirmed
      }
    });
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        {/* Section for the cover image */}
        {auction.cover && (
          <div className="col-md-4">
            <img
              src={auction.cover}
              className="img-fluid rounded-start"
              alt={auction.title}
              style={{ maxHeight: "200px", objectFit: "cover" }} // Optional: limit image height
            />
          </div>
        )}
        <div className="col-md-8">
          <div className="card-body">
            <Link to={`/auctions/${auction.id}`}>
              <h5>{auction.title}</h5>
            </Link>
            <p>{auction.description}</p>
            <p>Starting Bid: {auction.start_bid}</p>
            <p>
              Closing Date: {new Date(auction.closed_at).toLocaleDateString()}
            </p>

            {/* Only show delete button if onDeleteAuction is provided */}
            {onDeleteAuction && (
              <button
                type="button"
                onClick={handleDelete} // Call handleDelete when clicked
                className="btn btn-sm btn-outline-danger"
              >
                <FaTrash /> Hapus
              </button>
            )}
          </div>
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
    cover: PropTypes.string, // Cover image URL
  }).isRequired,
  onDeleteAuction: PropTypes.func, // Make this optional
};

export default AuctionItem;
