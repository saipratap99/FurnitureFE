import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";

export const getLeads = async () => {
  try {
    const response = await axios.get(`${apiPath}/Lead`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err;
  }
};

export const postLeadsHistory = async (leadId: string, payload: any) => {
  try {
    const response = await axios.post(
      `${apiPath}/Lead/${leadId}/history`,
      payload
    );
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err;
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
