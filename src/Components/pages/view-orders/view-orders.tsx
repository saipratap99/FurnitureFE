import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";
import { getOrders } from "../../../api/orders";

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<any>();
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserId(secureLocalStorage.getItem("userId"));
  }, []);
  useEffect(() => {
    // Fetch order details
    const fetchOrders = async () => {
      try {
        setLoading(true);
        getOrders(userId).then((data) => {
          setOrders(data);
        });
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading order details...</p>
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
    <Container className="mt-5">
      <h2 className="mb-4">Order Details</h2>
      {orders?.map((order) => (
        <Card className="mb-4" key={order.orderId}>
          <Card.Header>
            <strong>Order ID:</strong> {order.orderId}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h5>User Information</h5>
                <p>
                  <strong>Name:</strong> {order.user.userName}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
              </Col>
              <Col md={6}>
                <h5>Invoice Details</h5>
                <p>
                  <strong>Invoice Number:</strong>{" "}
                  {order.invoiceDetails.invoiceNumber}
                </p>
                <p>
                  <strong>Net Amount:</strong> ${order.invoiceDetails.netAmount}
                </p>
                <p>
                  <strong>Tax Amount:</strong> ${order.invoiceDetails.taxAmount}
                </p>
                <p>
                  <strong>Total Amount:</strong> $
                  {order.invoiceDetails.totalAmount}
                </p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <h5>Shipment Status</h5>
                <p>{order.shipmentStatus}</p>
              </Col>
            </Row>
            <h5 className="mt-4">Order Items</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item: any) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderDetailsPage;
