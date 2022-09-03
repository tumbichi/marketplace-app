import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Text,
  // Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { Drawer } from "../../molecules";

import useShoppingCart from "./hooks/useShoppingCart";
import Icon from "../../molecules/Icon/Icon";
import Image from "next/image";
import formatToCurrency from "../../utils/formatToCurrency";
import { Quantity } from "../../molecules/Quantity";

const ShoppingCart = () => {
  const {
    state: { items, shoppingCartModal },
    actions: { increaseOneProductToCart, decrementOneProductToCart },
  } = useShoppingCart();

  const handleClick = () => {
    shoppingCartModal.onOpen();
  };

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={handleClick}>
        <Center gap={3}>
          <Badge colorScheme="whiteAlpha" px={2} py={1}>
            {items.length}
          </Badge>
          <Icon name="shopping-cart" />
        </Center>
      </Button>
      <Drawer
        isOpen={shoppingCartModal.isOpen}
        onClose={shoppingCartModal.onClose}
        placement="right"
        size="md"
      >
        {{
          title: "Shopping cart",
          body:
            items.length === 0 ? (
              <Alert status="warning">
                <AlertIcon />
                There are not any products
              </Alert>
            ) : (
              <Flex flexDirection="column" gap={4}>
                {items.map((shoppingCartItem) => (
                  <Box key={shoppingCartItem.product.title}>
                    <Flex>
                      <Box>
                        <Image
                          height="196px"
                          width="196px"
                          layout="fixed"
                          objectFit="contain"
                          src={shoppingCartItem.product.imageUrl}
                          alt={shoppingCartItem.product.title}
                        />
                      </Box>
                      <Flex
                        flexDirection="column"
                        justifyContent="space-between"
                        flex={1}
                        p={4}
                      >
                        <Text
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          fontSize="lg"
                          noOfLines={1}
                        >
                          {shoppingCartItem.product.title}
                        </Text>
                        <Flex  justifyContent="space-between">
                          <Flex gap={1}>
                            <Quantity
                              value={shoppingCartItem.quantity}
                              increment={() =>
                                increaseOneProductToCart(
                                  shoppingCartItem.product
                                )
                              }
                              decrement={() =>
                                decrementOneProductToCart(
                                  shoppingCartItem.product
                                )
                              }
                            />
                          </Flex>
                          <Text fontSize="xl" fontWeight="semibold">
                            {formatToCurrency(shoppingCartItem.product.price)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            ),
        }}
      </Drawer>
    </>
  );
};

export default ShoppingCart;
