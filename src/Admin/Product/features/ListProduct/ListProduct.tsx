import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Text, useToast } from "@chakra-ui/react";
import { deleteProductService } from "../../../../Admin/Product/features/CreateProduct/services/deleteProduct";
import Product from "../../../../models/Product";
import AdminProductTable from "./components/AdminProductTable";

// import useShoppingCart from "../ShoppingCart/hooks/useShoppingCart";
// import ProductCard from "../../../Shared/components/ProductCard";

interface ProductListProps {
  isAdmin?: boolean;
}

const ListProduct: FC<ProductListProps> = () => {
  const toast = useToast();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleDeleteProduct = (productId: number) => {
    setDeleteLoading(true);

    deleteProductService(productId)
      .then((deletedProduct) => {
        toast({
          title: `${deletedProduct.title} was deleted`,
          status: "success",
          isClosable: true,
        });
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`).then(({ data }) => {
          setProducts(data);
        });
      })
      .catch(() => {
        toast({
          title: `Product cannot be deleted`,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setDeleteLoading(false));
  };

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productsStock`).then(({ data }) => {
      console.log("data :>> ", data);
      setProducts(data);
    });
  }, []);

  if (!products) {
    return <Text>No products :(</Text>;
  } else {
    return <AdminProductTable products={products} deleteLoading={deleteLoading} onDelete={handleDeleteProduct} />;
  }
};

export default ListProduct;
