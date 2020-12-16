import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../types/Auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "firebase";

const AuthContext = React.createContext<Partial<Auth>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
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

  const signout = () => {
    return auth.signOut();
  };

  const value: Auth = {
    currentUser: currentUser,
    signup: create,
    signin: signin,
    signout: signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
