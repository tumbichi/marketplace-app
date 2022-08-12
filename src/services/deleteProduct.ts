import axios from "axios";

export const deleteProductService = async (productId: number) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/products/${productId}`
    );
    console.log("res.data", res.data);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
