import axios from "axios";

const apiPath = "http://localhost:5194/api/v1";
export const postCategoryMapping = async (
  subCategoryId: string,
  payload: any
) => {
  try {
    const response = await axios.post(
      `${apiPath}/CategorySubCategoryMapping/AssignCategoriesToSubCategory/${subCategoryId}`,
      payload
    );
    console.log("Posted data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
  }
};
