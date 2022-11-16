import axios from "axios";

export const deleteCategoryService = async (categoryId: number) => {
  try {
    await axios.delete<void>(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
    );
    return;
  } catch (e) {
    console.error("DELETE CATEGORY ERROR", e);
    throw new Error("error") as any;
  }
};
