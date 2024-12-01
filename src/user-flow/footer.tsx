import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./footer.css"

const Footer: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fetch testimonials from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5194/api/v1/Testimonial"); // Replace with your endpoint
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <footer className="footer foot_con bg-secondary text-light py-5 mt-4">
      <Container>
        <h4 className="text-center mb-4">What Our Clients Say </h4>
        <Row>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <Col md={4} key={testimonial.id} className="mb-4">
                <Card className="bg-light shadow-sm p-3">
                  <Card.Body>
                    <Card.Text>"{testimonial.testimonialText}"</Card.Text>
                    <Card.Footer>
                      <small className="text-muted">
                        <strong>{testimonial.name}</strong>
                        {testimonial.role && `, ${testimonial.role}`}
                        {testimonial.company && ` - ${testimonial.company}`}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No testimonials available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
