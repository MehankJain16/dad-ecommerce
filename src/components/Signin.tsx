import React, { useCallback, useRef, useState } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css";
import google from "../assets/google.svg";

const Signin: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signin, googleSignin } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const validate = () => {
    if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
      let eError = "";
      let pError = "";

      // Email
      if (emailRef.current.value === "") {
        eError = "Please Provide A Email !";
      }

      // Password
      if (passwordRef.current.value === "") {
        pError = "Please Provide Password !";
      }

      // Validate
      if (eError || pError) {
        setEmailError(eError);
        setPasswordError(pError);
        return false;
      }

      setEmailError("");
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
        if (!validate()) {
          return false;
        }

        // Creation Of User
        setLoading(true);
        try {
          await signin!(emailRef.current.value, passwordRef.current.value);
          setAuthError("");
          history.replace("/");
        } catch (error: any) {
          switch (error.code) {
            case "auth/user-not-found":
              setEmailError("User Not Found!");
              break;
            case "auth/email-already-in-use":
              setEmailError("Email Already Registered");
              break;
            case "auth/internal-error":
              setAuthError("Something went wrong. Please try again later");
              break;
            case "auth/weak-password":
              setPasswordError("Please provide a strong Password");
              break;
            case "auth/invalid-email":
              setEmailError("Please provide a valid Email Id!");
              break;
            case "auth/wrong-password":
              setPasswordError("Invalid Password!");
              break;
            default:
              setAuthError("Something went wrong.");
              break;
          }
        }

        setLoading(false);
      }
    },
    [history, signin]
  );

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#EFDAB3" }}
    >
      <Container className="auth-box">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4 auth-header">Sign In</h2>
            {authError && <Alert variant="danger">{authError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label className="auth-input-label">Email</Form.Label>
                <Form.Control
                  className="auth-input"
                  placeholder="Enter Email"
                  type="email"
                  ref={emailRef}
                />
                <Form.Text className="auth-input-error">{emailError}</Form.Text>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label className="auth-input-label">Password</Form.Label>
                <Form.Control
                  className="auth-input"
                  placeholder="Enter Secure Password"
                  type="password"
                  ref={passwordRef}
                />
                <Form.Text className="auth-input-error">
                  {passwordError}
                </Form.Text>
              </Form.Group>
              <Button
                disabled={loading}
                type="submit"
                className="w-100 auth-submit-button mt-4"
              >
                {loading && (
                  <Spinner
                    as="span"
                    size="sm"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!loading && <p style={{ marginBottom: 0 }}>Sign In</p>}
              </Button>
              <p
                className="text-center mb-0 mt-3"
                style={{ color: "#AAAAAA", fontSize: 12 }}
              >
                OR
              </p>
              <Button
                onClick={async () => {
                  setLoadingGoogle(true);
                  await googleSignin!()
                    .then((result) => {
                      // The signed-in user info.
                      var user = result.user;
                      console.log(user);
                    })
                    .catch((error) => {
                      console.log(JSON.stringify(error));
                    });
                  setLoadingGoogle(false);
                }}
                disabled={loadingGoogle}
                className="w-100 auth-google-button"
              >
                {loadingGoogle && (
                  <Spinner
                    as="span"
                    size="sm"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {!loadingGoogle && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={google}
                      alt="google"
                      style={{ width: 24, height: 24, marginRight: 20 }}
                    />
                    <p style={{ marginBottom: 0, color: "gray" }}>
                      Sign In With Google
                    </p>
                  </div>
                )}
              </Button>
              <h4 className="text-center auth-switch-text mt-4">
                Don't Have An Account ? <Link to="/signup">Sign Up</Link>
              </h4>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;
