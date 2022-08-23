import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LayoutProps } from "framer-motion";
import React, { FC, PropsWithChildren, ReactNode } from "react";
import { Drawer, Header } from "../../molecules";

interface LayoutProps {
  children: {
    header: ReactNode;
    content: ReactNode;
  };
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {children.header}
      <Flex>
        <Box
          h="calc(100vh - 5rem)"
          w={60}
          p={4}
          bg="gray.200"
          position="sticky"
          overscrollBehavior="contain"
        >
          <Heading size="lg">Filters</Heading>
          <Text as="i">Select the filters you wish</Text>
        </Box>
        <Flex flex={1}>{children.content}</Flex>
      </Flex>
    </>
  );
};

export default Layout;
