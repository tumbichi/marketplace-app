import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Text, useToast } from "@chakra-ui/react";
import { deleteProductService } from "../../../../Admin/Product/features/CreateProduct/services/deleteProduct";
import useShoppingCart from "../ShoppingCart/hooks/useShoppingCart";
import Product from "../../../../models/Product";

import ProductCard from "../../../Shared/components/ProductCard";

interface ProductListProps {
  isAdmin?: boolean;
}

const ProductsList: FC<ProductListProps> = () => {
  const {
    state: { items },
    actions: { addProductToCart },
  } = useShoppingCart();
  const toast = useToast();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleDeleteProduct = (productId: number) => {
    // setDeleteLoading(true);

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
      });
    // .finally(() => setDeleteLoading(false));
  };

  const handleAddProductToCart = (product: Product) => {
    addProductToCart(product);
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
    return (
      <Box h="100%" width="100%" p={4}>
        <Grid templateColumns="repeat(4, 1fr)" w="100%" my={8} gap={8}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              description={product.description}
              addProductToCart={() => handleAddProductToCart(product)}
              stockCount={product.count}
            />
          ))}
        </Grid>
      </Box>
    );
  }
};

export default ProductsList;
