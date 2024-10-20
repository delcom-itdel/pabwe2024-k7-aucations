import PropTypes from "prop-types";
import AuctionItem from "./AuctionItem";

function AuctionList({ auctions, onDeleteAuction }) {
  return (
    <div className="row">
      {auctions.map((auction) => (
        <div
          className="col-lg-4 col-md-6 mb-4 d-flex justify-content-center"
          key={auction.id}
        >
          <AuctionItem auction={auction} onDeleteAuction={onDeleteAuction} />
        </div>
      ))}
    </div>
  );
}

AuctionList.propTypes = {
  auctions: PropTypes.array.isRequired,
  onDeleteAuction: PropTypes.func,
};

export default AuctionList;
