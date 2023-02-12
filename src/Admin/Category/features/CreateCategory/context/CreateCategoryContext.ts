import { createContext } from "react";
import { Category } from "../../../../../models/Category";
import SelectItem from "../../../../../models/SelectItem";
import CreateCategoryState from "../models/CreateCategoryState";

export interface CreateCategoryContext {
  state: CreateCategoryState;
  actions: {
    hideLoading: () => void;
    onChangeFormInput: (key: "title", value: string) => void;
    handleCreateCategory: () => void;
  };
}

export default createContext<CreateCategoryContext | undefined>(undefined);
