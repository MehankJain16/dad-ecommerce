import firebase from "firebase";
import { User } from "./User";

export type Auth = {
  currentUser: firebase.User | null;

  user: User | null;

  signup: (email: string, password: string, username: string) => Promise<any>;

  signin: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;

  // googleSignin: () => Promise<firebase.auth.UserCredential>;

  signout: () => Promise<void>;
};
