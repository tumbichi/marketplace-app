import axios from "axios";
import { Category } from "../../../../../models/Category";

interface CategoryCreationDto extends Omit<Category, "id"> {}

export const createCategoryService = async ({ title }: CategoryCreationDto) => {
  try {
    const { data: category } = await axios.post<Category>(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      {
        title,
      }
    );
    return category;
  } catch (e) {
    // TODO: Manejar el error
    console.error("CREATE CATEGORY ERROR", e);
    throw new Error("error") as any;
  }
};
