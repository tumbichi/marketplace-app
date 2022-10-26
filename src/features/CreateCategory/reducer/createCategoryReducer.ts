import { Reducer } from "react";
import CreateCategoryActions from "../actions/CreateCategoryActions";
import CreateCategoryState from "../models/CreateCategoryState";

export type CreateCategoryReducer = Reducer<
  CreateCategoryState,
  CreateCategoryActions
>;

export const initialState: CreateCategoryState = {
  loading: false,
  title: "",
  }

const createCategoryReducer: CreateCategoryReducer = (
  state: CreateCategoryState,
  action: CreateCategoryActions
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
        title: action.payload
      };
    }
    case "RESET_FORM": {
      return initialState
    }
    default: {
      return state;
    }
  }
};

export default createCategoryReducer;
