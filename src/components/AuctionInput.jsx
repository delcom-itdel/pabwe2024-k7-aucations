import { useState } from "react";
import PropTypes from "prop-types";

function AuctionInput({ onAddAuction }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [cover, setCover] = useState(null); // Simpan file cover di state

  // Handler untuk menambah auction
  function handleOnAddAuction(e) {
    e.preventDefault();

    const fullClosedAt = `${closedAt} 23:59:59`; // Tambahkan waktu default ke closedAt

    if (title.trim() && description.trim() && startBid && closedAt && cover) {
      onAddAuction({
        title,
        description,
        start_bid: startBid,
        closed_at: fullClosedAt,
        cover, // Kirim file cover
      });
    } else {
      alert("Please fill in all fields, including the cover image.");
    }
  }

  // Handler untuk menangani perubahan file cover
  function handleFileChange(e) {
    const selectedFile = e.target.files[0]; // Ambil file dari input
    setCover(selectedFile); // Simpan file ke state cover
    console.log("File selected:", selectedFile); // Logging untuk debugging
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
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">
              Cover Image
            </label>
            <input
              type="file"
              id="inputCover"
              accept="image/*"
              onChange={handleFileChange} // Menangani perubahan file
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
