import axios from "axios";

export const deleteCategoryService = async (categoryId: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
    );
    console.log("res.data", res.data);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
