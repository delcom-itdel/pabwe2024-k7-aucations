import { useState } from "react";
import PropTypes from "prop-types";

function AuctionInput({ onAddAuction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");

  function handleOnAddAuction(e) {
    e.preventDefault();
    if (
      title.trim() &&
      description.trim() &&
      startBid.trim() &&
      closedAt.trim()
    ) {
      onAddAuction({
        title,
        description,
        start_bid: startBid,
        closed_at: closedAt,
      });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Create Auction</h3>
        <hr />
        <form onSubmit={handleOnAddAuction}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="inputTitle"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="inputStartBid" className="form-label">
              Start Bid
            </label>
            <input
              type="number"
              id="inputStartBid"
              onChange={(e) => setStartBid(e.target.value)}
              value={startBid}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputClosedAt" className="form-label">
              Closed At
            </label>
            <input
              type="date"
              id="inputClosedAt"
              onChange={(e) => setClosedAt(e.target.value)}
              value={closedAt}
              className="form-control"
              required
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Save Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AuctionInput.propTypes = {
  onAddAuction: PropTypes.func.isRequired,
};

export default AuctionInput;
