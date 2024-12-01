import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postProductTag = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/ProductTags/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getProductTags = async () => {
  try {
    const response = await axios.get(`${apiPath}/ProductTags`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const editProductTag = async (payload: any) => {
  try {
    const response = await axios.put(
      `${apiPath}/ProductTags/Update/${payload["id"]}`,
      payload
    );
    console.log("Update data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const deleteProductTag = async (payload: any) => {
  try {
    const response = await axios.delete(
      `${apiPath}/ProductTags/Delete/${payload["id"]}`
    );
    console.log("Delete data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
