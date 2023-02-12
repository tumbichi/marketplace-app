import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { AppLayout } from "Marketplace/Shared/layout";

import Navbar from "Marketplace/ShoppingCart/features/Navbar/Navbar";
import ShoppingCartProvider from "Marketplace/ShoppingCart/features/ShoppingCart/context/ShoppingCartProvider";

import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import "../Shared/assets/icons";
config.autoAddCss = false;

const theme = extendTheme({
  colors: {
    brand: {
      500: "#DB9498",
    },
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ShoppingCartProvider>
        {router.route.startsWith("/admin") ? (
          <Component {...pageProps} />
        ) : (
          <AppLayout>
            {{
              header: <Navbar />,
              content: <Component {...pageProps} />,
            }}
          </AppLayout>
        )}
      </ShoppingCartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
