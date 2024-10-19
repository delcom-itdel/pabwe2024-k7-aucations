import PropTypes from "prop-types";
import AuctionItem from "./AuctionItem"; // Komponen untuk satu item auction

function AuctionList({ auctions, onDeleteAuction }) {
  return (
    <div>
      {auctions.map((auction) => (
        <AuctionItem
          key={auction.id}
          auction={auction}
          onDeleteAuction={onDeleteAuction}
        />
      ))}
    </div>
  );
}

AuctionList.propTypes = {
  auctions: PropTypes.array.isRequired,
  onDeleteAuction: PropTypes.func,
};

export default AuctionList;
