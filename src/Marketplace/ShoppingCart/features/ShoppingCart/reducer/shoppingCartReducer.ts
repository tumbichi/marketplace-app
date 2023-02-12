import Product from "../../../../../models/Product";
import ShoppingCartActions from "../actions/ShoppingCartActions";

interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartState {
  loading: boolean;
  items: ShoppingCartItem[];
}

export default function shoppingCartReducer(
  state: ShoppingCartState,
  action: ShoppingCartActions
) {
  switch (action.type) {
    case "shoppingCart/addProductToCart": {
      const productExists = state.items.find(
        (cartItem) => cartItem.product.id === action.payload.id
      );
      if (productExists) {
        const shopingCartUpdated = state.items.map((cartItem) => {
          if (
            cartItem.product.id === action.payload.id &&
            cartItem.quantity < cartItem.product.count
          ) {
            const quantityUpdated = cartItem.quantity + 1;
            return {
              product: cartItem.product,
              quantity: quantityUpdated,
            };
          }
          return cartItem;
        });

        return {
          ...state,
          items: shopingCartUpdated,
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload,
            quantity: 1,
          },
        ],
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
    case "shoppingCart/increaseOneProductToCart": {
      const shopingCartUpdated = state.items.map((cartItem) => {
        if (cartItem.product.id === action.payload.id) {
          const quantityUpdated = cartItem.quantity + 1;
          return {
            product: cartItem.product,
            quantity: quantityUpdated,
          };
        }
        return cartItem;
      });

      return {
        ...state,
        items: shopingCartUpdated,
      };
    }
    case "shoppingCart/decrementOneProductToCart": {
      const shoppingCart = [...state.items];
      const shopingCartUpdated = shoppingCart
        .map((cartItem) => {
          if (cartItem.product.id === action.payload.id) {
            const quantityUpdated = cartItem.quantity - 1;

            return {
              product: cartItem.product,
              quantity: quantityUpdated,
            };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity !== 0);

      return {
        ...state,
        items: shopingCartUpdated,
      };
    }
    default: {
      return state;
    }
  }
}
