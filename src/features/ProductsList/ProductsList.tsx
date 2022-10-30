import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Text, useToast } from "@chakra-ui/react";
import { ProductCard } from "../../molecules";
import { deleteProductService } from "../CreateProduct/services/deleteProduct";
import useShoppingCart from "../ShoppingCart/hooks/useShoppingCart";
import Product from "../../models/Product";

interface ProductListProps {
  isAdmin?: boolean;
}

const ProductsList: FC<ProductListProps> = ({ isAdmin }) => {
  const {
    state: { items },
    actions: { addProductToCart },
  } = useShoppingCart();
  const toast = useToast();
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
          title: `product cannot was deleted`,
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

  return (
    <Box h="100%" width="100%" p={4}>
      <Grid templateColumns="repeat(4, 1fr)" w="100%" my={8} gap={8}>
        {products.length === 0 ? (
          <Text>{"There are not products :("}</Text>
        ) : (
          products.map((product: Product) => {
            return (
              <ProductCard
                key={product.title}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                stockCount={product.count}
                addProductToCart={() => handleAddProductToCart(product)}
              />
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default ProductsList;
