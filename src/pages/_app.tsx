import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Layout } from "../template";

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
      {router.route.startsWith("/admin") ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
