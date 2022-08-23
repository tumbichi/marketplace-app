import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Header } from "../../molecules";
import { ShoppingCart } from "..";

const Navbar = () => {
  return (
    <Header>
      {{
        logo: (
          <Image src="/logo.svg" alt="Vercel Logo" width={96} height={96} />
        ),
        leftContent: (
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.500" />
            </InputLeftElement>
            <Input type="tel" placeholder="Search products" />
          </InputGroup>
        ),
        rightContent: (
          <>
            <ShoppingCart />
            {true ? <SunIcon /> : <MoonIcon />}
            <Link href="#">
              <Text>Login</Text>
            </Link>
            <Link href="#">
              <Text>Sign up</Text>
            </Link>
          </>
        ),
      }}
    </Header>
  );
};

export default Navbar;
