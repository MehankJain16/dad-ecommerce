import React, { useState } from "react";
import "../styles/nav-bar.css";
import profile from "../assets/profile-user.svg";
import like from "../assets/like.svg";
import cart from "../assets/shopping-cart.svg";

interface NavbarProps {
  signout: (() => Promise<void>) | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ signout }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
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
        <div
          className="nav-bar-actions-profile"
          onClick={async () => {
            await signout!();
            window.location.reload();
          }}
        >
          <img id="user-profile-img" src={profile} alt="user-profile" />
        </div>
        <div className="nav-bar-actions-like">
          <img id="user-likes-img" src={like} alt="user-likes" />
        </div>
        <div className="nav-bar-actions-cart">
          <img id="user-cart-img" src={cart} alt="user-cart" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
