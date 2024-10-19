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
                width: "600px", // Increased width for longer display
                height: "400px", // Increased height for taller display
                objectFit: "cover", // Maintain aspect ratio and fill the box
                display: "block", // Ensure image is displayed as a block
                marginLeft: "0", // Align left
                marginRight: "auto", // Center the right margin
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
