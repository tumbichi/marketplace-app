import { createContext } from "react";
import Product from "../../../models/Product";
import SelectItem from "../../../models/SelectItem";
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
    handleCreateProduct: () => Promise<Product>;
    resetForm: () => void;
  };
}

export default createContext<CreateProductContext | undefined>(undefined);
