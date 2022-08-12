import React, { FC } from "react";
import {
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, Search2Icon } from "@chakra-ui/icons";
import Image from "next/image";

interface HeaderProps {
  darkMode: boolean;
}

const Header: FC<HeaderProps> = ({ darkMode }) => {
  return (
    <header>
      <Flex bg="brand.500" h={20} w="100%" justifyContent="space-between">
        <Center gap={6} pl={8} pr={8}>
          <Image src="/logo.svg" alt="Vercel Logo" width={96} height={96} />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.500" />
            </InputLeftElement>
            <Input type="tel" placeholder="Search products" />
          </InputGroup>
        </Center>
        <Center gap={6} pr={8} pl={8}>
          {darkMode ? <SunIcon /> : <MoonIcon />}

          <Link href="#">
            <Text>Login</Text>
          </Link>
          <Link href="#">
            <Text>Sign up</Text>
          </Link>
        </Center>
      </Flex>
    </header>
  );
};

export default Header;
