import PropTypes from "prop-types";

function AuctionDetail({ auction }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2>{auction.title}</h2>
        <p>{auction.description}</p>
        <p>Starting Bid: {auction.start_bid}</p>
        <p>Closing Date: {new Date(auction.closed_at).toLocaleDateString()}</p>

        {auction.cover && (
          <div className="mb-3">
            <img
              src={auction.cover}
              alt={`Cover for ${auction.title}`}
              style={{
                maxWidth: "300px", // Batas maksimum lebar gambar
                height: "auto", // Otomatis menyesuaikan tinggi agar proporsional
                display: "block", // Untuk memastikan gambar ditampilkan sebagai blok
                margin: "0 auto", // Agar gambar berada di tengah
              }}
            />
          </div>
        )}
      </div>
    </div>
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
