import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { Drawer, Header } from "../../molecules";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Header darkMode={false} />
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
          <Button mt={4} bg="brand.500" onClick={onOpen}>
            Open
          </Button>
        </Box>
        <Flex flex={1}>{children}</Flex>
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Layout;
