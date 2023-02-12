import {
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  SlideDirection,
  Text,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: SlideDirection;
  children: {
    title: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
  };
  size?: string;
}

const Drawer: FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  placement = "left",
  size = "xs",
}) => {
  return (
    <ChakraDrawer
      size={size}
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{children.title}</DrawerHeader>

        <DrawerBody>{children.body}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Buy</Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
