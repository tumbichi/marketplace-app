import SelectItem from "../../../models/SelectItem";
import { ProductKey } from "../context/CreateProductContext";
import ImageInput from "../models/ImageInput";

interface ShowLoadingAction {
  type: "SHOW_LOADING_ACTION";
}

interface HideLoadingAction {
  type: "HIDE_LOADING_ACTION";
}

interface ChangeFormInput {
  type: "CHANGE_FORM_INPUT";
  payload: {
    key: ProductKey;
    value?: string | number;
    label?: string;
  };
}

interface ChangeImageInput {
  type: "CHANGE_IMAGE_INPUT";
  payload: ImageInput;
}

interface ClearFormAction {
  type: "CLEAR_FORM";
}

type CreateProductActions =
  | ShowLoadingAction
  | HideLoadingAction
  | ChangeFormInput
  | ChangeImageInput
  | ClearFormAction;

export default CreateProductActions;
