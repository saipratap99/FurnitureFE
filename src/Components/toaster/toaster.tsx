import Toast from "react-bootstrap/Toast";

interface ToasterProps {
  message: string;
  color?: string;
}

const Toaster = ({ message, color = "bg-success" }: ToasterProps) => {
  return (
    <Toast className={`position-fixed ${color}`}>
      {/* <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header> */}
      <Toast.Body color="#000000">{message}</Toast.Body>
    </Toast>
  );
};

export default Toaster;
