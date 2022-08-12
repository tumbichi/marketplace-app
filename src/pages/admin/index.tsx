import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

const BackofficePages = () => {
  return (
    <Center h="100vh" flexDirection="column">
      <Heading mb={10}>Menus</Heading>
      <Link href="/admin/products">
        <Text>list products</Text>
      </Link>
      <Link href="/admin/products/create-product">
        <Text>create product</Text>
      </Link>
      <Link href="/admin/create-category">
        <Text>create category</Text>
      </Link>
    </Center>
  );
};

export default BackofficePages;
