import axios from "axios";

export const deleteProductService = async (productId: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
    );
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
