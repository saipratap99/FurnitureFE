import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postOrder = async (payload: any) => {
  try {
    const response = await axios.post(`${apiPath}/Category/Create`, payload);
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getOrders = async (user_id: any | null) => {
  try {
    const response = await axios.get(
      `${apiPath}/Order${user_id ? "?userId=" + user_id : ""}`
    );
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
