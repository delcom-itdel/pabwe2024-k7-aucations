import PropTypes from "prop-types";
import AuctionItem from "./AuctionItem"; // Komponen untuk satu item auction

function AuctionList({ auctions, onDeleteAuction }) {
  return (
    <div className="row">
      {" "}
      {/* Menambahkan kelas row untuk memulai grid */}
      {auctions.map((auction) => (
        <div className="col-md-4 mb-4" key={auction.id}>
          {" "}
          {/* Menggunakan 4 kolom per baris untuk mendapatkan 3 kartu */}
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
