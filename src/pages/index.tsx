import { Box, Flex, Heading, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ProductsList } from "../features";

const Home: NextPage = () => {
  const [filters, setFilters] = useState([
    { label: "Atribute 1" },
    { label: "Atribute 2" },
    { label: "Atribute 3" },
  ]);

  const handleFilterClose = (label: string) => {
    setFilters((prev) => prev.filter((f) => f.label !== label));
  };

  return (
    <>
      <Head>
        <title>Betabel Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Flex
          w="100%"
          // bg="gray.100"
          p={4}
          my={2}
          gap={4}
          borderRadius="lg"
          direction={"column"}
        >
          <Heading size="md">Filters</Heading>
          <Flex gap={2}>
            {filters.map((filter) => (
              <Tag
                key={filter.label}
                borderRadius="full"
                variant="solid"
                bg="brand.500"
              >
                <TagLabel>{filter.label}</TagLabel>
                <TagCloseButton
                  onClick={() => handleFilterClose(filter.label)}
                />
              </Tag>
            ))}
          </Flex>
        </Flex>
        <Flex
          alignItems="start"
          justify={"flex-start"}
          h="100%"
          w="100%"
          // bg="red.300"
          as="main"
        >
          <ProductsList />
        </Flex>
      </Box>
    </>
  );
};

export default Home;
