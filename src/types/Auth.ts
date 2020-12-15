import firebase from "firebase";

export type Auth = {
  currentUser: firebase.User | null;

  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;

  signin: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
};
