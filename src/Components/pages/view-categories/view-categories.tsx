import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FormElement } from "../../../types/form-model";
import FormPopUp from "../../formsPopUp/forms-pop-up";
import { postCategory, getCategories } from "../../../api/category";
import Toaster from "../../toaster/toaster";

const ViewCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  const categoryForm: FormElement[] = [
    {
      label: "Category Name",
      name: "name",
      type: "text",
      placeholder: "Please enter the category",
      required: true,
    },
  ];

  useEffect(() => {
    getCategories().then((data) => setCategoriesList(data));
  }, []);
  const createCategorySubmit = (formData: any) => {
    try {
      postCategory(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage("Created category successfully.");
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to create category.");
      setToasterColor("bg-danger");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        {showToaster && (
          <Toaster message={toasterMessage} color={toasterColor} />
        )}
        <h2>Categories</h2>
        <div>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Category
          </Button>
          <FormPopUp
            show={showModal}
            title="Create Category"
            handleClose={() => setShowModal(false)}
            handleSubmit={createCategorySubmit}
            formElements={categoryForm}
          />
        </div>
      </div>

      <div className="categories-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((cat) => {
              return (
                <tr id={cat["id"]}>
                  <td>{cat["id"]}</td>
                  <td>{cat["name"]}</td>
                  <td>
                    <Button variant="warning me-2">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewCategories;