import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearchPlus } from "react-icons/fa";

function AuctionDetail({ auction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="card mb-4 shadow-sm auction-card">
        <div className="row g-0" style={{ height: "100%" }}>
          <div
            className="col-md-6 d-flex flex-column"
            style={{ padding: "10px" }}
          >
            <div className="card title-card">
              <div style={{ padding: "10px", textAlign: "center" }}>
                <h2 className="card-title title-spacing">
                  {" "}
                  {/* Tambahkan kelas title-spacing */}
                  {auction.title}
                </h2>
              </div>
            </div>

            <div className="card bid-date-card mb-3">
              <p className="fw-bold mb-3">
                Starting Bid: Rp {auction.start_bid.toLocaleString("id-ID")}
              </p>
              <p className="text-muted">
                Closing Date: {new Date(auction.closed_at).toLocaleDateString()}
              </p>
            </div>

            <div className="p-3" style={{ color: "black" }}>
              <p
                className="card-text"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {auction.description}
              </p>
            </div>
          </div>

          {auction.cover && (
            <div
              className="col-md-6 text-center position-relative"
              style={{ padding: "10px" }}
            >
              <img
                src={auction.cover}
                alt={`Cover untuk ${auction.title}`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={openModal}
              />

              <div
                className="position-absolute view-button"
                onClick={openModal}
              >
                <FaSearchPlus className="me-2" /> View
              </div>
            </div>
          )}
        </div>
      </div>

      {auction.cover && (
        <div
          className={`modal fade ${isModalOpen ? "show" : ""}`}
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{auction.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={auction.cover}
                  alt={`Tampilan penuh untuk ${auction.title}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AuctionDetail.propTypes = {
  auction: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_bid: PropTypes.number.isRequired,
    closed_at: PropTypes.string.isRequired,
    cover: PropTypes.string,
  }).isRequired,
};

export default AuctionDetail;
