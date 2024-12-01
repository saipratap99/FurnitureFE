import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import "./invoice.css"
// Define the type for the invoice details
interface Invoice {
  id: string;
  date: string;
  invoiceNumber: string;
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
  orderId: string;
}

const Invoice: React.FC = () => {
    const navigate=useNavigate()
  const { orderId } = useParams<{ orderId: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchInvoiceDetails(orderId);
    }
  }, [orderId]);
const handleHomeNavigation=()=>{
    navigate("/")
}
  const fetchInvoiceDetails = async (orderId: string) => {
    try {
      const response = await axios.get<Invoice>(`http://localhost:5194/api/v1/Invoice/Get/${orderId}`);
      setInvoice(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Failed to fetch invoice details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading invoice details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
    <Container className="mt-5">
      {invoice ? (
        <Card>
          <Card.Header className="bg-primary invoice-bg text-white">
            <h4>Invoice Details</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
                <p><strong>Order ID:</strong> {invoice.orderId}</p>
              </Col>
              <Col md={6}>
                <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ${invoice.totalAmount.toFixed(2)}</p>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <p><strong>Net Amount:</strong> ${invoice.netAmount.toFixed(2)}</p>
              </Col>
              <Col>
                <p><strong>Tax Amount:</strong> ${invoice.taxAmount.toFixed(2)}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">No invoice details found.</Alert>
      )}
      <div className='d-flex justify-content-center button_style align-items-center'>
      <Button
        variant="primary"
        onClick={handleHomeNavigation}
      >
        Home
      </Button>
      </div>
    </Container>
  </>
  );
};

export default Invoice;
