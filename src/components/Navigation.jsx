import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket } from "react-icons/fa6";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

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
    },
    button: {
      backgroundColor: "#fff",
      color: "#07575B",
      border: "none",
      borderRadius: "20px",
      padding: "0.5rem 1rem",
      marginRight: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s",
    },
    buttonHover: {
      backgroundColor: "#e0e0e0",
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
      textDecoration: "none",
      transition: "background-color 0.2s",
    },
    dropdownItemHover: {
      backgroundColor: "#66A5AD",
    },
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={styles.navbar}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={styles.navbarBrand}>
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
            style={{ borderColor: "#fff" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="mt-2 me-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/auctions/add"
                  style={styles.button}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.buttonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      styles.button.backgroundColor)
                  }
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
