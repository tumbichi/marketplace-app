import { Reducer } from "react";
import CreateProductActions from "../actions/CreateProductActions";
import CreateProductState from "../models/CreateProductState";

export type CreateProductReducer = Reducer<
  CreateProductState,
  CreateProductActions
>;

export const initialState: CreateProductState = {
  loading: false,
  productForm: {
    title: { value: "", error: null },
    description: { value: "" },
    price: {
      value: "0",
    },
    image: undefined,
    category: null,
  },
};

const createProductReducer: CreateProductReducer = (
  state: CreateProductState,
  action: CreateProductActions
) => {
  switch (action.type) {
    case "SHOW_LOADING_ACTION": {
      return {
        ...state,
        loading: true,
      };
    }
    case "HIDE_LOADING_ACTION": {
      return {
        ...state,
        loading: false,
      };
    }
    case "CHANGE_FORM_INPUT": {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [action.payload.key]: {
            ...state.productForm[action.payload.key],
            value: action.payload.value,
            label: action.payload.label,
          },
        },
      };
    }
    case "CHANGE_IMAGE_INPUT": {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          image: { file: action.payload.file, src: action.payload.src },
        },
      };
    }
    case "CLEAR_FORM": {
      return {
        ...state,
        productForm: {
          ...initialState.productForm,
          price: { ...state.productForm.price, value: "" },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default createProductReducer;
