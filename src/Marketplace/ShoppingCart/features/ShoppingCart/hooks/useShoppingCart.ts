import { useContext } from "react";
import ShoppingCartContext from "../context/ShoppingCartContext";

export default function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (context === undefined) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }

  return context;
}
