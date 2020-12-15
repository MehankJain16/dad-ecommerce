import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../types/Auth";
import { auth } from "../firebase";
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

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signin = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const value: Auth = {
    currentUser: currentUser,
    signup: signup,
    signin: signin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
