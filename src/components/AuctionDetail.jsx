import PropTypes from "prop-types";

function AuctionDetail({ auction }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="row">
          {auction.cover && (
            <div className="col-4 text-center">
              <img
                src={auction.cover}
                alt={`Cover for ${auction.title}`}
                style={{
                  width: "400px", 
                  height: "300px", 
                  objectFit: "cover", 
                  display: "block", 
                  marginLeft: "auto",
                  marginRight: "auto", 
                }}
              />
            </div>
          )}

          <div className="col-8">
            <h2 className="card-title text-primary mt-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
              {auction.title}
            </h2>

            <p className="card-text text-start" style={{ maxHeight: "150px", overflowY: "auto", fontFamily: 'Roboto, sans-serif' }}>
              {auction.description}
            </p>

            <p className="fw-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Starting Bid: Rp {auction.start_bid.toLocaleString('id-ID')}
            </p>
            <p className="text-muted" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Closing Date: {new Date(auction.closed_at).toLocaleDateString()}
            </p>
          </div>
        </div>
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
