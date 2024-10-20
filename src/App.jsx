import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import AuctionAddPage from "./pages/AuctionAddPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import AuctionEditPage from "./pages/AuctionEditPage";

function App() {
  const { authLogin = null, isPreload = false } = useSelector(
    (states) => states
  );
  const location = useLocation();
  const dispatch = useDispatch();

  // Menambahkan state untuk Auction type
  const [selectedAuctionType, setSelectedAuctionType] = useState("allAuctions");

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };

  // Menambahkan handler untuk mengubah tipe lelang (auctions)
  const handleAuctionTypeChange = (type) => {
    setSelectedAuctionType(type);
  };

  if (isPreload) {
    return null;
  }

  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";
    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Aucations App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 text-center">
                <Link
                  className={`nav-link ${activeLogin} btl`}
                  to="/"
                  style={{
                    backgroundColor: activeLogin ? "#07575B" : "#D3D3D3",
                    color: activeLogin ? "white" : "#07575B",
                    borderRadius: "4px",
                  }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 text-center">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                  style={{
                    backgroundColor: activeRegister ? "#07575B" : "#D3D3D3",
                    color: activeRegister ? "white" : "#07575B",
                    borderRadius: "4px",
                  }}
                >
                  Register
                </Link>
              </li>
            </ul>

            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <header className="fixed-top">
          <Navigation
            authLogin={authLogin}
            onAuthSignOut={onAuthSignOut}
            selectedAuctionType={selectedAuctionType} // Mengirim state ke Navigation
            onAuctionTypeChange={handleAuctionTypeChange} // Handler perubahan tipe
          />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={
                <HomePage
                  selectedAuctionType={selectedAuctionType} // Kirim tipe lelang ke HomePage
                  onAuctionTypeChange={handleAuctionTypeChange} // Handler untuk perubahan
                />
              }
            />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/auctions/add" element={<AuctionAddPage />} />
            <Route path="/auctions/:id" element={<AuctionDetailPage />} />
            <Route path="/auctions/edit/:id" element={<AuctionEditPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
