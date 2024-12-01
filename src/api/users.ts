import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiPath}/User`);
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    throw err;
  }
};
