import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postCategory = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/Category/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiPath}/Category`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getSubcategories = async (categ_id:any) => {
  try {
    const response = await axios.get(`http://localhost:5194/api/v1/Category/GetSubcategories/${categ_id}`);
    console.log("Get data:", response.data);
    return response.data
  } catch (err) {
    console.error("Error getting subCategories:", err);
  }

};

export const editCategories = async (payload: any) => {
  try {
    const response = await axios.put(
      `${apiPath}/Category/Update/${payload["id"]}`,
      payload
    );
    console.log("Update data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
export const deleteCategories = async (payload: any) => {
  try {
    const response = await axios.delete(
      `${apiPath}/Category/Delete/${payload["id"]}`
    );
    console.log("Delete data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
