import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FormElement } from "../../../types/form-model";
import FormPopUp from "../../formsPopUp/forms-pop-up";
import {
  postProductTag,
  getProductTags,
  editProductTag,
  deleteProductTag,
} from "../../../api/product-tag";
import Toaster from "../../toaster/toaster";

const ViewProductTags = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");
  const [productTagsList, setProductTagsList] = useState<any[]>([]);
  const [currentEditProductTag, setCurrentEditProductTag] = useState<any>(null);

  const productTagForm: FormElement[] = [
    {
      label: "Product Tag Name",
      name: "name",
      type: "text",
      placeholder: "Please enter the product tag name",
      required: true,
    },
  ];

  useEffect(() => {
    getProductTags().then((data) => setProductTagsList(data));
  }, []);

  useEffect(() => {
    if (currentEditProductTag) setEditShowModal(true);
  }, [currentEditProductTag]);
  const createCategorySubmit = (formData: any) => {
    try {
      postProductTag(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage("Created Product Tag successfully.");
        setProductTagsList([...productTagsList, data]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to create Product tag.");
      setToasterColor("bg-danger");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const editCategorySubmit = (formData: any) => {
    try {
      editProductTag(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage(data);
        const updatedProductTagsList = productTagsList.map((cat) => {
          if (cat["id"] == formData["id"]) {
            cat["name"] = formData["name"];
          }
          return cat;
        });
        setProductTagsList([...updatedProductTagsList]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to update Product Tag.");
      setToasterColor("bg-danger");
    } finally {
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const deleteCategorySubmit = (formData: any) => {
    try {
      deleteProductTag(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage(data);
        const updatedProductTagsList = productTagsList.filter(
          (cat) => cat["id"] !== formData["id"]
        );
        setProductTagsList([...updatedProductTagsList]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to delete product tag.");
      setToasterColor("bg-danger");
    } finally {
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
        {showEditModal && (
          <FormPopUp
            show={showEditModal}
            title="Update Category"
            handleClose={() => setEditShowModal(false)}
            handleSubmit={editCategorySubmit}
            formElements={productTagForm}
            formValues={currentEditProductTag}
          />
        )}
        <h2>Product Tags</h2>
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
            formElements={productTagForm}
          />
        </div>
      </div>

      <div className="categories-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Tag Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productTagsList?.map((cat) => {
              return (
                <tr id={cat["id"]}>
                  <td>{cat["id"]}</td>
                  <td>{cat["name"]}</td>
                  <td>
                    <Button
                      variant="warning me-2"
                      onClick={() => {
                        setCurrentEditProductTag({
                          id: cat["id"],
                          name: cat["name"],
                        });
                        // setEditShowModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteCategorySubmit({ id: cat["id"] })}
                    >
                      Delete
                    </Button>
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

export default ViewProductTags;
