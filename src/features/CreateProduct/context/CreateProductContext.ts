import { createContext } from "react";
import ProductCreationDTO from "../../../models/ProductCreationDTO";
import CreateProductState from "../models/CreateProductState";

export type ProductKey = "title" | "description" | "price" | "category";

export interface CreateProductContext {
  state: CreateProductState;
  actions: {
    hideLoading: () => void;
    onChangeFormInput: (
      key: ProductKey,
      value?: string | number,
      label?: string
    ) => void;
    onChangeImage: (file: File, src: string) => void;
    handleCreateProduct: () => Promise<ProductCreationDTO>;
    resetForm: () => void;
  };
}

export default createContext<CreateProductContext | undefined>(undefined);
