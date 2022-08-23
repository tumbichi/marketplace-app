import { createContext } from "react";

export interface ShoppingCartContext {}

export default createContext<ShoppingCartContext | undefined>(undefined);
