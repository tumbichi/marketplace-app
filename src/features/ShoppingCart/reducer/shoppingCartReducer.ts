import Product from "../../../models/Product";
import ShoppingCartActions from "../actions/ShoppingCartActions";

interface ShoppingCartState {
  loading: boolean;
  products: Product[];
}

export default function shoppingCartReducer(
  state: ShoppingCartState,
  action: ShoppingCartActions
) {
  switch (action.type) {
    case "shoppingCart/addProduct": {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case "shoppingCart/showLoading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "shoppingCart/hideLoading": {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
