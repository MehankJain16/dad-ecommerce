import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { GlobalProvider } from "../contexts/GlobalContext";
import BannerImage from "./BannerImage";
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
    <GlobalProvider>
      <div>
        <Navbar
          signout={signout}
          isLoggedIn={isLoggedIn}
          username={user ? user.username : "Guest"}
        />
        <BannerImage />
      </div>
    </GlobalProvider>
  );
};

export default Home;
