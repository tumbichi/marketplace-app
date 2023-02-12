import { useDisclosure, useToast } from "@chakra-ui/react";
import { FC, PropsWithChildren, useCallback, useMemo, useReducer } from "react";
import Product from "../../../../../models/Product";
import shoppingCartReducer from "../reducer/shoppingCartReducer";
import ShoppingCartContext from "./ShoppingCartContext";

const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const toast = useToast();
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
    const cartItem = state.items.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (!cartItem) {
      dispatch({ type: "shoppingCart/addProductToCart", payload: product });
      toast({
        title: `${product.title} added to cart!`,
        status: "success",
        isClosable: true,
      });
      return;
    }

    if (cartItem && cartItem.quantity < product.count) {
      dispatch({ type: "shoppingCart/addProductToCart", payload: product });
      toast({
        title: `Added one more ${product.title} to cart!`,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: `We don't have more stock of ${product.title} !`,
        status: "error",
        isClosable: true,
      });
    }
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
