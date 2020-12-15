import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css";

const Signin: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signin } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
      if (!validate()) {
        return false;
      }

      // Creation Of User
      try {
        setLoading(true);
        await signin!(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        console.log(JSON.stringify(error));
      }

      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#EFDAB3" }}
    >
      <Container className="auth-box">
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4 auth-header">Sign In</h2>
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
