import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FormElement } from "../../../types/form-model";
import FormPopUp from "../../formsPopUp/forms-pop-up";
import {
  postSubCategory,
  getSubCategories,
  editSubCategories,
  deleteSubCategories,
} from "../../../api/sub-category";
import Toaster from "../../toaster/toaster";
import { getCategories } from "../../../api/category";
import { postCategoryMapping } from "../../../api/categorySubCategoryMapping";

const ViewSubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");
  const [subCategoriesList, setSubCategoriesList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [currentEditSubCategory, setCurrentEditSubCategory] =
    useState<any>(null);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState<
    string | null
  >(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [addCategoryForm, setAddCategoryForm] = useState<FormElement[]>([]);
  const [addCategoryFormData, setAddCategoryFormData] = useState<any>();

  const subCategoryForm: FormElement[] = [
    {
      label: "Sub-Category Name",
      name: "name",
      type: "text",
      placeholder: "Please enter new sub-category name",
      required: true,
    },
  ];

  useEffect(() => {
    getSubCategories().then((data) => setSubCategoriesList(data));
    getCategories().then((data) => setCategoriesList(data));
  }, []);

  useEffect(() => {
    if (showAddCategoryModal) setCurrentSubCategoryId(null);
  }, [showAddCategoryModal]);
  useEffect(() => {
    if (currentSubCategoryId) {
      const newCategoryForm: FormElement[] = [
        {
          label: "Select Categories",
          name: "categoryId",
          type: "select",
          placeholder: "Please select categories to map",
          required: true,
          isMultiSelect: true,
          dropDownData: categoriesList?.map((cat) => {
            return {
              value: cat["id"],
              displayName: cat["name"],
              isSelected: "false",
            };
          }),
        },
      ];
      const foundSubCat = subCategoriesList.find(
        (subcat) => (subcat["id"] = currentSubCategoryId)
      );
      const formData = {
        subCategoryId: currentSubCategoryId,
        categoryId: foundSubCat
          ? foundSubCat["categories"]?.map((cat: any) => cat["id"])
          : [],
      };
      console.log("formd", formData);
      setAddCategoryFormData(formData);
      setAddCategoryForm(newCategoryForm);
    }
  }, [currentSubCategoryId]);

  useEffect(() => {
    if (currentEditSubCategory) setEditShowModal(true);
  }, [currentEditSubCategory]);
  const createSubCategorySubmit = (formData: any) => {
    try {
      postSubCategory(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage("Created Sub-category successfully.");
        setSubCategoriesList([...subCategoriesList, data]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to create sub-category.");
      setToasterColor("bg-danger");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const editCategorySubmit = (formData: any) => {
    try {
      editSubCategories(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage(data);
        const updatedSubCategoriesList = subCategoriesList.map((cat) => {
          if (cat["id"] == formData["id"]) {
            cat["name"] = formData["name"];
          }
          return cat;
        });
        setSubCategoriesList([...updatedSubCategoriesList]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to update sub-category.");
      setToasterColor("bg-danger");
    } finally {
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const deleteSubCategorySubmit = (formData: any) => {
    try {
      deleteSubCategories(formData).then((data) => {
        setShowToaster(true);
        setToasterMessage(data);
        const updatedSubCategoriesList = subCategoriesList.filter(
          (cat) => cat["id"] !== formData["id"]
        );
        setSubCategoriesList([...updatedSubCategoriesList]);
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    } catch (err) {
      setShowToaster(true);
      setToasterMessage("Failed to delete sub-category.");
      setToasterColor("bg-danger");
    } finally {
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    }
  };

  const assignCategoriesSubmit = (formData: any) => {
    console.log("formdata", formData);
    postCategoryMapping(
      currentSubCategoryId || "",
      formData?.categoryId?.map((cat: string) => {
        return {
          subCategoryId: currentSubCategoryId,
          categoryId: cat,
        };
      })
    ).then((data: any) => {
      setShowToaster(true);
      setToasterMessage(data);
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    });
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
            formElements={subCategoryForm}
            formValues={currentEditSubCategory}
          />
        )}
        {showAddCategoryModal && (
          <FormPopUp
            show={showAddCategoryModal}
            title="Associate Categories"
            handleClose={() => setShowAddCategoryModal(false)}
            handleSubmit={assignCategoriesSubmit}
            formElements={addCategoryForm}
            formValues={addCategoryFormData}
          />
        )}
        <h2>Sub-Categories</h2>
        <div>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Sub-Category
          </Button>
          <FormPopUp
            show={showModal}
            title="Create Sub-Category"
            handleClose={() => setShowModal(false)}
            handleSubmit={createSubCategorySubmit}
            formElements={subCategoryForm}
          />
        </div>
      </div>

      <div className="categories-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Sub-Category Name</th>
              <th>Categories Linked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategoriesList?.map((cat) => {
              return (
                <tr id={cat["id"]}>
                  <td>{cat["id"]}</td>
                  <td>{cat["name"]}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setShowAddCategoryModal(true);
                        setCurrentSubCategoryId(cat["id"]);
                      }}
                    >
                      Add Category
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning me-2"
                      onClick={() => {
                        setCurrentEditSubCategory({
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
                      onClick={() => deleteSubCategorySubmit({ id: cat["id"] })}
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

export default ViewSubCategories;
