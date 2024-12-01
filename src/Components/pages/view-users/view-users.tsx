import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FormElement } from "../../../types/form-model";
import { getUsers } from "../../../api/users";

const ViewUsers = () => {
  const [usersList, setUsersList] = useState<any[]>([]);

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
    getUsers().then((data) => setUsersList(data));
  }, []);

  return (
    <div className="p-4">
      <h2>Users</h2>
      <div className="categories-list">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((cat) => {
              return (
                <tr id={cat["id"]}>
                  <td>{cat["id"]}</td>
                  <td>{cat["name"]}</td>
                  <td>{cat["mobile"]}</td>
                  <td>{cat["email"]}</td>
                  <td>{cat["role"]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewUsers;
