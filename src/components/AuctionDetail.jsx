import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearchPlus } from "react-icons/fa";

function AuctionDetail({ auction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row">
            {auction.cover && (
              <div className="col-4 text-center position-relative">
                <img
                  src={auction.cover}
                  alt={`Cover untuk ${auction.title}`}
                  style={{
                    width: "400px",
                    height: "300px",
                    objectFit: "cover",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer", // gambar bisa diklik
                    position: "relative",
                  }}
                  onClick={openModal} // buka sewaktu diklik
                />

                <div
                  className="position-absolute"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    bottom: "1px", // kanan bawah
                    right: "15px",
                    fontSize: "14px",
                  }}
                  onClick={openModal}
                >
                  <FaSearchPlus className="me-2" /> View
                </div>
              </div>
            )}

            <div className="col-8">
              <h2
                className="card-title text-primary mt-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
              >
                {auction.title}
              </h2>

              <p
                className="card-text text-start"
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {auction.description}
              </p>

              <p
                className="fw-bold"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Starting Bid: Rp {auction.start_bid.toLocaleString("id-ID")}
              </p>
              <p
                className="text-muted"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Closing Date: {new Date(auction.closed_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gambar Full */}
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
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </div> */}
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
