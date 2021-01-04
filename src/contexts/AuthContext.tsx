import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../types/Auth";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { User } from "../types/User";

const AuthContext = React.createContext<Partial<Auth>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserInfo = async (uid: string) => {
      // Getting The User From Firestore DB
      const dbUser = await db.doc(`users/${uid}`).get();

      // Setting The User To Custom Type
      const user: User = {
        username: dbUser.get("username"),
      };

      setUser(user);
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        getUserInfo(user ? user.uid : "");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const create = async (email: string, password: string, username: string) => {
    try {
      const signup = await auth.createUserWithEmailAndPassword(email, password);
      const uid = signup.user?.uid;
      await db.doc(`users/${uid}`).set({
        username,
      });
    } catch (error: any) {
      throw error;
    }

    return true;
  };

  const signin = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // const googleSignin = async () => {
  //   return auth.signInWithPopup(provider);
  // };

  const signout = () => {
    return auth.signOut();
  };

  const value: Auth = {
    currentUser: currentUser,
    user: user,
    signup: create,
    signin: signin,
    // googleSignin: googleSignin,
    signout: signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
