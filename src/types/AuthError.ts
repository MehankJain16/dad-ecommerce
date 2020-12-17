export type AuthErrorType = {
  USER_NOT_FOUND: string;
  EMAIL_ALREADY_EXIST: string;
  INTERNAL_ERROR: string;
  DEFAULT_MESSAGE: string;
  WRONG_PASSWORD: string;
  INVALID_EMAIL_FORMAT: string;
  WEAK_PASS: string;
};

const USER_NOT_FOUND = "No User Found!";
const EMAIL_ALREADY_EXIST = "User with email already exists!";
const INTERNAL_ERROR = "Something went wrong. Please try again later";
const DEFAULT_MESSAGE = "Something went wrong.";
const WRONG_PASSWORD = "Invalid Password!";
const INVALID_EMAIL_FORMAT = "Please provide a valid Email Id!";
const WEAK_PASS = "Please provide a strong Password";

export const getFirebaseErrorMessage = (code: string) => {
  var message: AuthErrorType | null = null;

  switch (code) {
    case "auth/user-not-found":
      message!.USER_NOT_FOUND = USER_NOT_FOUND;
      break;
    case "auth/email-already-in-use":
      message!.EMAIL_ALREADY_EXIST = EMAIL_ALREADY_EXIST;
      break;
    case "auth/internal-error":
      message!.INTERNAL_ERROR = INTERNAL_ERROR;
      break;
    case "auth/weak-password":
      message!.WEAK_PASS = WEAK_PASS;
      break;
    case "auth/invalid-email":
      message!.INVALID_EMAIL_FORMAT = INVALID_EMAIL_FORMAT;
      break;
    case "auth/wrong-password":
      message!.WRONG_PASSWORD = WRONG_PASSWORD;
      break;
    default:
      message!.DEFAULT_MESSAGE = DEFAULT_MESSAGE;
      break;
  }
  return message;
};
