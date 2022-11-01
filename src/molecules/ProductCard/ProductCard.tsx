import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface ProductCardProps {
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  description: string;
  price: number;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={props.imageUrl} alt={props.imageAlt} maxH="" />

      <Flex p="6" flexDirection="column" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {props.title}
          </Text>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          {/* <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.beds} beds &bull; {props.baths} baths
          </Box> */}
        </Box>
        <Box flex={1} minH="80px">
          <Text py={1}>{props.description}</Text>
        </Box>
        <Flex mt={6} alignContent="flex-end" justifyContent="flex-end" flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            {props.price?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
