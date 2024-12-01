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

  formValues?: { [key: string]: string };

  isMultiSelect?: boolean;
}

const FormPopUp = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formElements,
  formValues,
  isMultiSelect,
}: FormPopUpProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    formValues || {}
  );

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
              {element?.type !== "select" ? (
                <Form.Control
                  type={element.type || "text"}
                  name={element.name}
                  placeholder={element.placeholder || ""}
                  value={formData[element.name] || ""}
                  onChange={handleChange}
                  required={element.required || false}
                />
              ) : (
                <Form.Select multiple={isMultiSelect}>
                  <option disabled>{element.placeholder || ""}</option>
                  {element.dropDownData?.map((op) => {
                    return (
                      op && (
                        <option
                          value={op?.value || ""}
                          selected={op?.isSelected === "true" || false}
                        >
                          {op?.displayName || ""}
                        </option>
                      )
                    );
                  })}
                </Form.Select>
              )}
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
