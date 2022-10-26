import axios from "axios";
import { Category } from "../../../models/Category";

export const createCategoryService = async ({
  id,
  title
}: Category): Promise<Category> => {

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      id,
      title
    }
  );

  return Promise.resolve(response.data);
};
