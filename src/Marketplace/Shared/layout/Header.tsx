import React, { FC, ReactNode } from "react";
import { Center, Flex } from "@chakra-ui/react";

interface HeaderProps {
  children: {
    logo: ReactNode;
    leftContent?: ReactNode;
    centerContent?: ReactNode;
    rightContent?: ReactNode;
  };
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header>
      <Flex bg="brand.500" h={20} w="100%" justifyContent="space-between">
        <Center gap={6} pl={8} pr={8}>
          {children.logo}
          {children.leftContent}
        </Center>
        <Center gap={6} pr={8} pl={8}>
          {children.rightContent}
        </Center>
      </Flex>
    </header>
  );
};

export default Header;
