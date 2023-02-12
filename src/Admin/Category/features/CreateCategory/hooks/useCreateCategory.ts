import { useContext } from "react";
import CreateProductContext from "../context/CreateCategoryContext";

export default function useCreateProduct() {
  const context = useContext(CreateProductContext);

  if (context === undefined) {
    throw new Error(
      "useCreateProduct must be used within a CreateProductProvider"
    );
  }

  return context;
}
