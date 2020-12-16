import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const Home: React.FC = () => {
  const { signout, currentUser } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await db.doc(`users/${currentUser!.uid}`).get();
      setUsername(user.get("username"));
    };
    fetchUserDetails();
  }, [currentUser]);

  return (
    <div>
      <h4 className="text-center">Home Page</h4>
      <h5 className="text-center">{username}</h5>
      <h4
        onClick={async () => {
          await signout!();
        }}
      >
        Logout
      </h4>
    </div>
  );
};

export default Home;
