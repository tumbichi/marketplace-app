import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

const BackofficePages = () => {
  return (
    <Center h="100vh" flexDirection="column">
      <Heading mb={10}>Menu</Heading>
      <Link href="/admin/products">
        <Text>Products list</Text>
      </Link>
      <Link href="/admin/products/create-product">
        <Text>Create product</Text>
      </Link>
      <Link href="/admin/create-category">
        <Text>Create category</Text>
      </Link>
    </Center>
  );
};

export default BackofficePages;
