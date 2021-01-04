import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/header.css";

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, username }) => {
  const history = useHistory();
  return (
    <div className="header">
      {!isLoggedIn && (
        <>
          <h4
            className="header-signin"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Sign In
          </h4>
          <h4
            className="header-signup"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign Up
          </h4>
        </>
      )}
      {isLoggedIn && <h4 className="header-username">Welcome {username}</h4>}
    </div>
  );
};

export default Header;
