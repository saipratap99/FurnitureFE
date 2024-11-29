// GenericModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FormElement } from "../../types/form-model";

interface FormPopUpProps {
  show: boolean;
  handleClose: any;

  title?: string;
  handleSubmit: any;

  formElements: FormElement[];
}

const FormPopUp = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formElements,
}: FormPopUpProps) => {
  const [formData, setFormData] = useState<any>({});

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  // Submit form data
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title || "Dynamic Form"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {formElements.map((element, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>{element.label}</Form.Label>
              <Form.Control
                type={element.type || "text"}
                name={element.name}
                placeholder={element.placeholder || ""}
                value={formData[element.name] || ""}
                onChange={handleChange}
                required={element.required || false}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormPopUp;
