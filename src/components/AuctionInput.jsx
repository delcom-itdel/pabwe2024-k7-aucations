import { useState } from "react";
import PropTypes from "prop-types";

function AuctionInput({ onAddAuction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [cover, setCover] = useState(null);

  function handleOnAddAuction(e) {
    e.preventDefault();

    const fullClosedAt = `${closedAt} 23:59:59`;

    if (title.trim() && description.trim() && startBid && closedAt && cover) {
      onAddAuction({
        title,
        description,
        start_bid: startBid,
        closed_at: fullClosedAt,
        cover,
      });
    } else {
      alert("Please fill in all fields, including the cover image.");
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setCover(selectedFile);
    console.log("File selected:", selectedFile);
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
              placeholder="Enter auction title"
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
              rows="5"
              placeholder="Enter auction description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="inputStartBid" className="form-label">
              Start Bid (in Rupiah)
            </label>
            <input
              type="number"
              id="inputStartBid"
              onChange={(e) => setStartBid(e.target.value)}
              value={startBid}
              className="form-control"
              placeholder="Enter starting bid"
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
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">
              Cover Image
            </label>
            <input
              type="file"
              id="inputCover"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              required
            />
            {cover && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(cover)}
                  alt="Cover Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#07575B",
                borderColor: "#07575B",
                color: "#fff",
              }}
            >
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
