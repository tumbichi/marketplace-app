import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface QuantityProps {
  value: number;
  increment: () => void;
  decrement: () => void;
  maxValue: number;
}

const Quantity: FC<QuantityProps> = ({
  value,
  increment,
  decrement,
  maxValue,
}) => {
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
        disabled={value === maxValue}
        size="xs"
        aria-label="plus"
        icon={<AddIcon />}
        onClick={increment}
      />
    </Flex>
  );
};

export default Quantity;
