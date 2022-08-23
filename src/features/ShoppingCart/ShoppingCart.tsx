import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Button,
  Center,
  Flex,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { Drawer } from "../../molecules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = () => {
  const [products, setProducts] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    setProducts((prev) => {
      return [...prev, prev.length + 1];
    });
    onOpen();
  };

  console.log("products :>> ", products);

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={handleClick}>
        <Center gap={3}>
          <Badge colorScheme="whiteAlpha" px={2} py={1}>
            {products.length}
          </Badge>
          <Icon
            aria-label="shoping cart"
            as={() => <FontAwesomeIcon icon={faShoppingCart} />}
          />
        </Center>
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        {{
          title: "Shopping cart",
          body: (
            <Alert status="warning">
              <AlertIcon />
              There are not any products
            </Alert>
          ),
        }}
      </Drawer>
    </>
  );
};

export default ShoppingCart;
