import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postContactUs = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/ContactUs/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err;
  }
};

export const getContactUs = async () => {
  try {
    const response = await axios.get(`${apiPath}/ContactUs`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
