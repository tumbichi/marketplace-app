import React, { FC, useEffect, useState } from "react";
import { Box, Grid, IconButton, Text, useToast } from "@chakra-ui/react";
import { ProductCard } from "../../../molecules";
import Product from "../../../models/Product";

interface ClientProductGridProps {
  products: Product[];
}

const ClientProductGrid: FC<ClientProductGridProps> = ({ products }) => {
  return (
    <Box h="100%" width="100%" p={4}>
      <Grid templateColumns="repeat(4, 1fr)" w="100%" my={8} gap={8}>
        {products.map(({ title, price, description, image }) => (
          <>
            <ProductCard
              title={title}
              price={price}
              imageUrl={image.toString()}
              description={description}
            />
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientProductGrid;
