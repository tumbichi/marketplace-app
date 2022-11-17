import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Text, useToast } from "@chakra-ui/react";
import { deleteProductService } from "../CreateProduct/services/deleteProduct";
import useShoppingCart from "../ShoppingCart/hooks/useShoppingCart";
import Product from "../../models/Product";

import AdminProductTable from "./admin/AdminProductTable";
import ClientProductGrid from "./client/ClientProductGrid";

interface ProductListProps {
  isAdmin?: boolean;
}

const ProductsList: FC<ProductListProps> = ({ isAdmin }) => {
  const {
    state: { items },
    actions: { addProductToCart },
  } = useShoppingCart();
  const toast = useToast();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleDeleteProduct = (productId: number) => {
    // setDeleteLoading(true);

    deleteProductService(productId)
      .then((deletedProduct) => {
        toast({
          title: `${deletedProduct.title} was deleted`,
          status: "success",
          isClosable: true,
        });
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
          .then(({ data }) => {
            setProducts(data);
          });
      })
      .catch(() => {
        toast({
          title: `Product cannot be deleted`,
          status: "error",
          isClosable: true,
        });
      });
    // .finally(() => setDeleteLoading(false));
  };

  const handleAddProductToCart = (product: Product) => {
    addProductToCart(product);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/productsStock`)
      .then(({ data }) => {
        console.log("data :>> ", data);
        setProducts(data);
      });
  }, []);

  if (!products) {
    return <Text>No products :(</Text>;
  } else {
    return (
      <>
        {isAdmin ? (
          <AdminProductTable products={products} />
        ) : (
          <ClientProductGrid
            products={products}
            handleAddProductToCart={handleAddProductToCart}
          />
        )}
      </>
    );
  }
};

export default ProductsList;
