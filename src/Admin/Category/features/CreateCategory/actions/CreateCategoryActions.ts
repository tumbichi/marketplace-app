interface ShowLoadingAction {
  type: "SHOW_LOADING_ACTION";
}

interface HideLoadingAction {
  type: "HIDE_LOADING_ACTION";
}

interface ChangeFormInput {
  type: "CHANGE_FORM_INPUT";
  payload: string
}

interface ResetForm {
  type: "RESET_FORM";
  payload: Object;
}

type CreateCategoryActions =
  ResetForm
  | ShowLoadingAction
  | HideLoadingAction
  | ChangeFormInput

export default CreateCategoryActions;
