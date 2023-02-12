import { useContext } from "react";
import CreateProductContext from "../context/CreateProductContext";

export default function useCreateProduct() {
  const context = useContext(CreateProductContext);

  if (context === undefined) {
    throw new Error(
      "useCreateProduct must be used within a CreateProductProvider"
    );
  }

  return context;
}
