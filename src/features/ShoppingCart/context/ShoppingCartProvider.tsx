import { useDisclosure } from "@chakra-ui/react";
import { FC, PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import Product from "../../../models/Product";
import shoppingCartReducer from "../reducer/shoppingCartReducer";
import ShoppingCartContext from "./ShoppingCartContext";

const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    loading: false,
    items: [],
  });

  const shopingCartState = useMemo(
    () => ({ ...state, shoppingCartModal: { isOpen, onOpen, onClose } }),
    [state, isOpen, onOpen, onClose]
  );

  const addProductToCart = (product: Product) => {
    dispatch({ type: "shoppingCart/addProductToCart", payload: product });
  };

  const increaseOneProductToCart = (product: Product) => {
    dispatch({
      type: "shoppingCart/increaseOneProductToCart",
      payload: product,
    });
  };

  const decrementOneProductToCart = (product: Product) => {
    dispatch({
      type: "shoppingCart/decrementOneProductToCart",
      payload: product,
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        state: shopingCartState,
        actions: {
          addProductToCart,
          increaseOneProductToCart,
          decrementOneProductToCart,
        },
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
