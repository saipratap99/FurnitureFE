import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import Footer from "./footer";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [variant, setVariant] = useState<string>("success");
  const [loading, setLoading] = useState<boolean>(false);
const role="User";
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`http://localhost:5194/api/v1/User/Register`, {
        name,
        mobile,
        email,
        password,
        role
      });

      setMessage("Registration successful! You can now log in.");
      setVariant("success");

      // Clear form after successful registration
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleRegister} className="p-4 border rounded shadow-sm bg-white">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="mobile" className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
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
                  Registering...
                </>
              ) : (
                "Register"
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
    <Footer/>
    </>
  );
};

export default Register;
