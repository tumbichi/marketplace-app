import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Layout } from "../template";
import Navbar from "../features/Navbar/Navbar";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import ShoppingCartProvider from "../features/ShoppingCart/context/ShoppingCartProvider";
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
          <Layout>
            {{
              header: <Navbar />,
              content: <Component {...pageProps} />,
            }}
          </Layout>
        )}
      </ShoppingCartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
