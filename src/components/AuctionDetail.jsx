import PropTypes from "prop-types";

function AuctionDetail({ auction }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2>{auction.title}</h2>
        <p>{auction.description}</p>
        <p>Starting Bid: {auction.start_bid}</p>
        <p>Closing Date: {new Date(auction.closed_at).toLocaleDateString()}</p>
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
  }).isRequired,
};

export default AuctionDetail;
