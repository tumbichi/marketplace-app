import { FC, PropsWithChildren, useReducer } from "react";
import Product from "../../../models/Product";
import shoppingCartReducer from "../reducer/shoppingCartReducer";
import ShoppingCartContext from "./ShoppingCartContext";

// interface ShoppingCartProviderProps {}

const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    loading: false,
    products: [],
  });

  const addProduct = (product: Product) => {
    dispatch({ type: "shoppingCart/addProduct", payload: product });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        state,
        actions: {
          addProduct,
        },
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
