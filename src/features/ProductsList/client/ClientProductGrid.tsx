import React, { FC, useEffect, useState } from "react";
import { Box, Grid, IconButton, Text, useToast } from "@chakra-ui/react";
import { ProductCard } from "../../../molecules";
import Product from "../../../models/Product";

interface ClientProductGridProps {
  products: Product[];
  handleAddProductToCart(product: Product): void;
}

const ClientProductGrid: FC<ClientProductGridProps> = ({
  products,
  handleAddProductToCart,
}) => {
  return (
    <Box h="100%" width="100%" p={4}>
      <Grid templateColumns="repeat(4, 1fr)" w="100%" my={8} gap={8}>
        {products.map((product) => (
          <>
            <ProductCard
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              description={product.description}
              addProductToCart={() => handleAddProductToCart(product)}
              stockCount={product.count}
            />
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientProductGrid;
