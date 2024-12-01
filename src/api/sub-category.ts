import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postSubCategory = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/SubCategory/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getSubCategories = async () => {
  try {
    const response = await axios.get(`${apiPath}/SubCategory`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const editSubCategories = async (payload: any) => {
  try {
    const response = await axios.put(
      `${apiPath}/SubCategory/Update/${payload["id"]}`,
      payload
    );
    console.log("Update data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const deleteSubCategories = async (payload: any) => {
  try {
    const response = await axios.delete(
      `${apiPath}/SubCategory/Delete/${payload["id"]}`
    );
    console.log("Delete data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
