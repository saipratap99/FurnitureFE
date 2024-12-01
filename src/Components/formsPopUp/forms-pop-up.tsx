import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FormElement } from "../../types/form-model";

interface FormPopUpProps {
  show: boolean;
  handleClose: any;
  title?: string;
  handleSubmit: any;
  formElements: FormElement[];
  formValues?: { [key: string]: any };
}

const FormPopUp = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formElements,
  formValues = {},
}: FormPopUpProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(formValues);

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value, type, checked, multiple, options } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else if (multiple) {
      const selectedValues = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);
      setFormData((prevData) => ({ ...prevData, [name]: selectedValues }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Submit form data
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  console.log("fordddd", formData);

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
              <Form.Label htmlFor={element.name}>{element.label}</Form.Label>
              {(() => {
                switch (element.type) {
                  case "checkbox":
                    return (
                      <Form.Check
                        type="checkbox"
                        id={element.name}
                        name={element.name}
                        checked={formData[element.name] || false}
                        onChange={handleChange}
                        required={element.required || false}
                      />
                    );
                  case "select":
                    return (
                      <Form.Select
                        id={element.name}
                        name={element.name}
                        multiple={element.isMultiSelect}
                        value={
                          formData[element.name] ||
                          (element.isMultiSelect ? [] : "")
                        }
                        onChange={handleChange}
                        required={element.required || false}
                      >
                        <option value="" disabled>
                          {element.placeholder || "Select an option"}
                        </option>
                        {element.dropDownData?.map((op) => (
                          <option
                            key={op.value}
                            value={op.value}
                            selected={formData[element.name]?.includes(
                              op.value
                            )}
                          >
                            {op.displayName}
                          </option>
                        ))}
                      </Form.Select>
                    );
                  default:
                    return (
                      <Form.Control
                        type={element.type || "text"}
                        id={element.name}
                        name={element.name}
                        placeholder={element.placeholder || ""}
                        value={formData[element.name] || ""}
                        onChange={handleChange}
                        required={element.required || false}
                      />
                    );
                }
              })()}
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
