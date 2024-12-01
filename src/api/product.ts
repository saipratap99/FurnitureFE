import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postProduct = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/Product/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiPath}/Product`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const editProduct = async (id: any, payload: any) => {
  try {
    delete payload["id"];
    const response = await axios.put(
      `${apiPath}/Product/Update/${id}`,
      payload
    );
    console.log("Update data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const deleteProduct = async (payload: any) => {
  try {
    const response = await axios.delete(
      `${apiPath}/Product/Delete/${payload["id"]}`
    );
    console.log("Delete data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
