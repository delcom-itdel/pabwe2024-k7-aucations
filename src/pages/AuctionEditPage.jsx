import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  asyncDetailAuction,
  asyncEditAuction,
} from "../states/auctions/action";

function AuctionEditPage() {
  const { id } = useParams(); // Dapatkan id dari URL
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();

  const { detailAuction } = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAuction(id)); // Ambil detail auction untuk diedit
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (detailAuction) {
      setTitle(detailAuction.title);
      setDescription(detailAuction.description);
      setStartBid(detailAuction.start_bid);
      setClosedAt(detailAuction.closed_at); // Inisialisasi closed_at
    }
  }, [detailAuction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      asyncEditAuction(
        {
          id,
          title,
          description,
          start_bid: startBid,
          closed_at: closedAt,
        },
        navigate // Pass navigate as an argument
      )
    );
  };

  return (
    <div className="container pt-1">
      <h2>Edit Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Start Bid</label>
          <input
            type="number"
            value={startBid}
            onChange={(e) => setStartBid(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Closing Date</label>
          <input
            type="datetime-local"
            value={closedAt}
            onChange={(e) => setClosedAt(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AuctionEditPage;
