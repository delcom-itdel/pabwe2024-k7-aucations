import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket } from "react-icons/fa6";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

  const greenColor = "#4CAF50";
  const whiteColor = "#fff";

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: greenColor }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: whiteColor }}>
            Aucation App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ borderColor: whiteColor }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 me-2">
                {" "}
                {/* Add a 1 cm gap to the right */}
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/auctions/add"
                  style={{
                    backgroundColor: whiteColor,
                    color: greenColor,
                    marginRight: "10px", // 1 cm gap (10px)
                  }}
                >
                  <FaPlus /> Add New Auctions
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: whiteColor }}
                >
                  <img
                    className="nav-profile"
                    src={photo}
                    alt={id}
                    title={name}
                    style={{
                      borderRadius: "50%",
                      border: `2px solid ${greenColor}`,
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                  style={{ backgroundColor: greenColor, borderRadius: "5px" }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/users/me"
                      style={{ color: whiteColor }}
                    >
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                      style={{ color: whiteColor }}
                    >
                      <FaRightFromBracket /> Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;
