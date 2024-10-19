import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Added import for Link

function AuctionItem({ auction }) {
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
};

export default AuctionItem;
