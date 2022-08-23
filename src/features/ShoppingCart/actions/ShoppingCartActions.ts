import Product from "../../../models/Product";

interface ShowLoadingAction {
  type: "shoppingCart/showLoading";
}

interface HideLoadingAction {
  type: "shoppingCart/hideLoading";
}

interface AddProductAction {
  type: "shoppingCart/addProduct";
  payload: Product;
}

type ShoppingCartActions =
  | ShowLoadingAction
  | HideLoadingAction
  | AddProductAction;

export default ShoppingCartActions;
