import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import Carousel from "../Components/base-elements/carousel/carousel";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [variant, setVariant] = useState<string>("success");
  const [loading, setLoading] = useState<boolean>(false);
  const slides: string[] = [
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
    "https://devcarquest.wpengine.com/wp-content/uploads/2024/04/50thAnniversary.png",
  ];
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(`http://localhost:5194/api/v1/User/Login?email=${encodeURIComponent(email)}&password=${password}`, {
        email,
        password,
      });

      const { message: loginMessage, userId, userRole } = response.data;
      secureLocalStorage.setItem("userId", userId);
      setMessage(`${loginMessage} (Role: ${userRole})`);
      setVariant("success");
      console.log("User ID:", userId);
    
      if (userRole == "User") {
        navigate('/user-home')
        window.location.reload()
      }
      else {

      }

    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setVariant("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     {/* <Carousel slides={slides} height={400} /> */}
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-white">
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          {message && (
            <Alert
              variant={variant}
              className="mt-4"
              dismissible
              onClose={() => setMessage("")}
            >
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Login;
