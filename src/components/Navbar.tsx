import React, { useState } from "react";
import "../styles/nav-bar.css";
import profile from "../assets/profile-user.svg";
import like from "../assets/like.svg";
import cart from "../assets/shopping-cart.svg";
import search from "../assets/search.svg";
import { useGlobal } from "../contexts/GlobalContext";
import { useHistory } from "react-router-dom";

interface NavbarProps {
  signout: (() => Promise<void>) | undefined;
  isLoggedIn: boolean;
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ signout, isLoggedIn, username }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { isSmallScreen } = useGlobal();
  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();

  return (
    <>
      {!isSmallScreen && (
        <div className="nav-bar">
          <div className="nav-bar-logo">Logo</div>
          <div className="nav-bar-search">
            <input
              className="search-bar"
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search"
            />
          </div>
          <div className="nav-bar-actions">
            <div className="nav-bar-actions-profile">
              <img
                id="user-profile-img"
                src={profile}
                alt="user-profile"
                onClick={async () => {
                  setOpen(!open);
                }}
              />
              {open && (
                <div className="nav-dropdown-profile">
                  {!isLoggedIn && (
                    <>
                      <div
                        className="nav-dropdown-profile-item"
                        onClick={() => {
                          history.push("/signin");
                        }}
                      >
                        <h4>Login</h4>
                      </div>
                      <div
                        className="nav-dropdown-profile-item"
                        onClick={() => {
                          history.push("/signup");
                        }}
                      >
                        <h4>Register</h4>
                      </div>
                    </>
                  )}
                  {isLoggedIn && (
                    <>
                      <div className="nav-dropdown-profile-item">
                        <h4>{username}</h4>
                      </div>
                      <div
                        className="nav-dropdown-profile-item"
                        onClick={async () => {
                          await signout!();
                          window.location.reload();
                        }}
                      >
                        <h4>Logout</h4>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {isLoggedIn && (
              <div className="nav-bar-actions-like">
                <img id="user-likes-img" src={like} alt="user-likes" />
              </div>
            )}
            <div className="nav-bar-actions-cart">
              <img id="user-cart-img" src={cart} alt="user-cart" />
            </div>
          </div>
        </div>
      )}

      {isSmallScreen && (
        <div className="nav-bar">
          {!showSearchBar && (
            <>
              <div className="nav-bar-logo-active">Logo</div>
              <div className="nav-bar-actions-active">
                <div className="nav-bar-actions-profile">
                  <img
                    id="user-profile-img"
                    src={profile}
                    alt="user-profile"
                    onClick={async () => {
                      setOpen(!open);
                    }}
                  />
                  {open && (
                    <div className="nav-dropdown-profile">
                      {!isLoggedIn && (
                        <>
                          <div
                            className="nav-dropdown-profile-item"
                            onClick={() => {
                              history.push("/signin");
                            }}
                          >
                            <h4>Login</h4>
                          </div>
                          <div
                            className="nav-dropdown-profile-item"
                            onClick={() => {
                              history.push("/signup");
                            }}
                          >
                            <h4>Register</h4>
                          </div>
                        </>
                      )}
                      {isLoggedIn && (
                        <>
                          <div className="nav-dropdown-profile-item">
                            <h4>{username}</h4>
                          </div>
                          <div
                            className="nav-dropdown-profile-item"
                            onClick={async () => {
                              await signout!();
                              window.location.reload();
                            }}
                          >
                            <h4>Logout</h4>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="nav-bar-actions-search">
                  <img
                    id="nav-search"
                    src={search}
                    alt="nav-search"
                    onClick={() => {
                      setShowSearchBar(true);
                    }}
                  />
                </div>
                {isLoggedIn && (
                  <div className="nav-bar-actions-like">
                    <img id="user-likes-img" src={like} alt="user-likes" />
                  </div>
                )}
                <div className="nav-bar-actions-cart">
                  <img id="user-cart-img" src={cart} alt="user-cart" />
                </div>
              </div>
            </>
          )}
          {showSearchBar && (
            <div className="nav-bar-search">
              <input
                className="search-bar"
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Search"
              />
              <p
                style={{ marginBottom: 0 }}
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                Close
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
