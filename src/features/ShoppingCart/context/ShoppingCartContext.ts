import { createContext } from "react";
import Product from "../../../models/Product";
import { ShoppingCartState } from "../reducer/shoppingCartReducer";

interface ShoppingCartContextState extends ShoppingCartState {
  shoppingCartModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
}
export interface ShoppingCartContext {
  state: ShoppingCartContextState;
  actions: {
    addProductToCart: (product: Product) => void;
    increaseOneProductToCart: (product: Product) => void;
    decrementOneProductToCart: (product: Product) => void;
  };
}

export default createContext<ShoppingCartContext | undefined>(undefined);
