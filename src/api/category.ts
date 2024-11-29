import axios from "axios";

export const postCategory = async (payload: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5194/api/v1/Category/Create",
      payload
    );
    console.log("Posted data:", response.data);
  } catch (err) {
    console.error("Error posting data:", err);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:5194/api/v1/Category");
    console.log("Get data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
