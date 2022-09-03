import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface QuantityProps {
  value: number;
  increment: () => void;
  decrement: () => void;
}

const Quantity: FC<QuantityProps> = ({ value, increment, decrement }) => {
  return (
    <Flex gap={3} alignItems="center">
      <IconButton
        size="xs"
        aria-label="minus"
        icon={<MinusIcon />}
        onClick={decrement}
      />
      <Text fontSize="lg">{value}</Text>
      <IconButton
        size="xs"
        aria-label="plus"
        icon={<AddIcon />}
        onClick={increment}
      />
    </Flex>
  );
};

export default Quantity;
