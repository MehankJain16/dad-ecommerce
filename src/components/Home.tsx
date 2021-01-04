import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BannerImage from "./BannerImage";
import Header from "./Header";
import Navbar from "./Navbar";

const Home: React.FC = () => {
  const { signout, user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (user) {
        // Setting the state as logged in
        setIsLoggedIn(true);
      } else {
        // Setting the state as logged out
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, [user]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        username={user ? user.username : "Guest"}
      />
      <Navbar signout={signout} />
      <BannerImage />
    </div>
  );
};

export default Home;
