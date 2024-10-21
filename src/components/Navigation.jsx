import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket, FaGavel } from "react-icons/fa6";
import { useState } from "react";

function Navigation({
  authLogin,
  onAuthSignOut,
  selectedAuctionType,
  onAuctionTypeChange,
}) {
  const { id, name, photo } = authLogin;

  const [activeButton, setActiveButton] = useState(null);

  const handleMouseDown = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  const isActive = (buttonType) => activeButton === buttonType;

  const styles = {
    navbar: {
      backgroundColor: "#07575B",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s",
    },
    navbarBrand: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.5rem",
      margin: "0 20px",
    },
    dropdownButton: {
      backgroundColor: "#07575B",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
    },
    buttonActive: {
      backgroundColor: "#66A5AD",
      color: "#fff",
    },
    profileImg: {
      borderRadius: "50%",
      border: "3px solid #07575B",
      width: "40px",
      height: "40px",
    },
    dropdownMenu: {
      backgroundColor: "#07575B",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    dropdownItem: {
      color: "#fff",
      padding: "10px 20px",
      backgroundColor: "transparent",
      textDecoration: "none",
      transition: "background-color 0.2s",
    },
    dropdownItemHover: {
      backgroundColor: "#66A5AD",
    },
    dropdownItemActive: {
      backgroundColor: "#66A5AD",
    },
    // Tambahkan gaya untuk tombol "Add New Auctions"
    addNewButton: {
      backgroundColor: "#f8f9fa",
      color: "#343a40",
      border: "1px solid #dee2e6",
      borderRadius: "20px", // Membuat ujung tombol agak bulat
      padding: "0.375rem 0.75rem", // Atur padding agar tombol nyaman
    },
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container-fluid">
          {/* Icon button for Auctions */}
          <div className="mx-4">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="auctionTypeDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={styles.dropdownButton}
              >
                <FaGavel style={{ color: "#fff" }} />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="auctionTypeDropdown"
                style={styles.dropdownMenu}
              >
                <li>
                  <button
                    className={`dropdown-item ${
                      selectedAuctionType === "allAuctions" ? "active" : ""
                    }`}
                    style={
                      isActive("allAuctions")
                        ? styles.dropdownItemActive
                        : styles.dropdownItem
                    }
                    onClick={() => onAuctionTypeChange("allAuctions")}
                    onMouseDown={() => handleMouseDown("allAuctions")}
                    onMouseUp={handleMouseUp}
                  >
                    All Auctions
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      selectedAuctionType === "myAuctions" ? "active" : ""
                    }`}
                    style={
                      isActive("myAuctions")
                        ? styles.dropdownItemActive
                        : styles.dropdownItem
                    }
                    onClick={() => onAuctionTypeChange("myAuctions")}
                    onMouseDown={() => handleMouseDown("myAuctions")}
                    onMouseUp={handleMouseUp}
                  >
                    My Auctions
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${
                      selectedAuctionType === "otherAuctions" ? "active" : ""
                    }`}
                    style={
                      isActive("otherAuctions")
                        ? styles.dropdownItemActive
                        : styles.dropdownItem
                    }
                    onClick={() => onAuctionTypeChange("otherAuctions")}
                    onMouseDown={() => handleMouseDown("otherAuctions")}
                    onMouseUp={handleMouseUp}
                  >
                    Other Auctions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <Link className="navbar-brand" to="/" style={styles.navbarBrand}>
            Auction App
          </Link>

          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 me-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/auctions/add"
                  style={styles.addNewButton} // Ganti gaya tombol Add New Auctions
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
                  style={{ color: "#fff" }}
                >
                  <img
                    className="nav-profile"
                    src={photo}
                    alt={id}
                    title={name}
                    style={styles.profileImg}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                  style={styles.dropdownMenu}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/users/me"
                      style={styles.dropdownItem}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.dropdownItemHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      onMouseDown={() => handleMouseDown("profile")}
                      onMouseUp={handleMouseUp}
                    >
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                      style={styles.dropdownItem}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          styles.dropdownItemHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      onMouseDown={() => handleMouseDown("signout")}
                      onMouseUp={handleMouseUp}
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
  selectedAuctionType: PropTypes.string.isRequired,
  onAuctionTypeChange: PropTypes.func.isRequired,
};

export default Navigation;
