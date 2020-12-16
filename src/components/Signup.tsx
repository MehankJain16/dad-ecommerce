import React, { useRef, useState, useCallback } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { getFirebaseErrorMessage } from "../types/AuthError";
import "../styles/auth.css";

const Signup: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const validate = () => {
    if (
      usernameRef &&
      usernameRef.current &&
      emailRef &&
      emailRef.current &&
      passwordRef &&
      passwordRef.current
    ) {
      let uError = "";
      let eError = "";
      let pError = "";

      // Username
      if (usernameRef.current.value === "") {
        uError = "Please Provide A Username !";
      }

      // Email
      if (emailRef.current.value === "") {
        eError = "Please Provide A Email !";
      }

      // Password
      if (passwordRef.current.value === "") {
        pError = "Please Provide Password !";
      }

      // Validate
      if (uError || eError || pError) {
        setUsernameError(uError);
        setEmailError(eError);
        setPasswordError(pError);
        return false;
      }

      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      if (
        usernameRef &&
        usernameRef.current &&
        emailRef &&
        emailRef.current &&
        passwordRef &&
        passwordRef.current
      ) {
        if (!validate()) {
          return false;
        }

        // Creation Of User
        try {
          setLoading(true);
          await signup!(
            emailRef.current.value,
            passwordRef.current.value,
            usernameRef.current.value
          );
          history.push("/");
        } catch (error: any) {
          console.log(error.code);
          setAuthError(getFirebaseErrorMessage(error.code));
        }

        setLoading(false);
      }
    },
    [history, signup]
  );

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#EFDAB3" }}
    >
      <Container className="auth-box">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4 auth-header">Sign Up</h2>
            {authError && (
              <h4 className="text-center" style={{ color: "red" }}>
                {authError}
              </h4>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label className="auth-input-label">Username</Form.Label>
                <Form.Control
                  className="auth-input"
                  placeholder="Enter Username"
                  ref={usernameRef}
                />
                <Form.Text className="auth-input-error">
                  {usernameError}
                </Form.Text>
              </Form.Group>
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
                <Form.Text className="auth-input-error" muted>
                  *Your password must be 8-20 characters long and must not
                  contain spaces or emoji.
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
                {!loading && <p style={{ marginBottom: 0 }}>Sign Up</p>}
              </Button>
              <h4 className="text-center auth-switch-text mt-4">
                Already Have An Account ? <Link to="/signin">Sign In</Link>
              </h4>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
