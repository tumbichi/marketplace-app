import Product from "../../../models/Product";
import ProductCreationDTO from "../../../models/ProductCreationDTO";

interface ShowLoadingAction {
  type: "shoppingCart/showLoading";
}

interface HideLoadingAction {
  type: "shoppingCart/hideLoading";
}

interface AddProductToCartAction {
  type: "shoppingCart/addProductToCart";
  payload: Product;
}

interface IncreaseOneProductToCartAction {
  type: "shoppingCart/increaseOneProductToCart";
  payload: Product;
}

interface DecrementOneProductToCartAction {
  type: "shoppingCart/decrementOneProductToCart";
  payload: Product;
}

type ShoppingCartActions =
  | ShowLoadingAction
  | HideLoadingAction
  | AddProductToCartAction
  | IncreaseOneProductToCartAction
  | DecrementOneProductToCartAction;

export default ShoppingCartActions;
