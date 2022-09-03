import {
  Badge,
  Box,
  Center,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";
import formatToCurrency from "../../utils/formatToCurrency";
import Icon from "../Icon/Icon";

interface ProductCardProps {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  description: string;
  price: number;
  stockCount: number;
  addProductToCart: () => void;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  return (
    <Flex
      maxW="sm"
      minW="340px"
      h="360px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      direction="column"
    >
      <Box height="100%" maxH="240px">
        <Image
          height="240px"
          width="360px"
          layout="fixed"
          objectFit="contain"
          src={props.imageUrl}
          alt={props.imageAlt}
        />
      </Box>
      <Flex
        flex={1}
        px="6"
        flexDirection="column"
        justifyContent="space-between"
      >
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
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            &bull; Stock {props.stockCount}
          </Box>
        </Box>
        <Flex mb={3} justifyContent="space-between">
          <Box position="relative">
            <Box
              position="absolute"
              height="100%"
              width="100%"
              zIndex={1}
              pointerEvents="none"
            >
              <Box
                position="absolute"
                right={0}
                bottom={0}
                borderRadius="full"
                bg="brand.500"
                w="14px"
                h="14px"
              >
                <Center>
                  <Text fontWeight="semibold" fontSize="9px" color="white">
                    +
                  </Text>
                </Center>
              </Box>
            </Box>
            <Tooltip label="Add product to cart" hasArrow>
              <IconButton
                borderRadius="full"
                aria-label="bell icon"
                icon={<Icon name="shopping-cart" />}
                onClick={props.addProductToCart}
              />
            </Tooltip>
          </Box>
          <Text fontWeight="semibold" alignSelf={"flex-end"}>
            {formatToCurrency(props.price)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
