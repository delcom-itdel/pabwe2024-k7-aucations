import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Added import for Link

function AuctionItem({ auction }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/auction/${auction.id}`}>
          {" "}
          {/* Wrapped the auction title in a Link */}
          <h5>{auction.title}</h5>
        </Link>
        <p>{auction.description}</p>
        <p>Starting Bid: {auction.start_bid}</p>
        <p>Closing Date: {new Date(auction.closed_at).toLocaleDateString()}</p>
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
  }).isRequired,
};

export default AuctionItem;
