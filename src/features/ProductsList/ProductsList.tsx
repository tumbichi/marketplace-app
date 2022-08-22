import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, IconButton, Text, useToast } from "@chakra-ui/react";
import { ProductCard } from "../../molecules";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteProductService } from "../CreateProduct/services/deleteProduct";

interface ProductListProps {
  isAdmin?: boolean;
}

const ProductsList: FC<ProductListProps> = ({ isAdmin }) => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteProduct = (productId: number) => {
    setDeleteLoading(true);

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
      })
      .finally(() => setDeleteLoading(false));
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(({ data }) => {
        setProducts(data);
      });
  }, []);

  return (
    <Box h="100%" width="100%" p={4}>
      <Grid templateColumns="repeat(4, 1fr)" w="100%" my={8} gap={8}>
        {products.length === 0 ? (
          <Text>{"There are not products :("}</Text>
        ) : (
          products.map(({ id, title, price, description, imageUrl }) => (
            <>
              {isAdmin ? (
                <Box position="relative">
                  <Box top="-8px" right="12px" position="absolute">
                    <IconButton
                      isLoading={deleteLoading}
                      colorScheme="red"
                      variant="solid"
                      aria-label="delete icons"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(id)}
                    />
                  </Box>
                  <ProductCard
                    key={title}
                    title={title}
                    price={Number.parseFloat(price)}
                    imageUrl={imageUrl}
                    description={description}
                  />
                </Box>
              ) : (
                <ProductCard
                  key={title}
                  title={title}
                  price={Number.parseFloat(price)}
                  imageUrl={imageUrl}
                  description={description}
                />
              )}
            </>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProductsList;
