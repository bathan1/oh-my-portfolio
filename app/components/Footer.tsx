import { Box, Flex, Text, Link } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" py="6" mt="auto" borderTopWidth="1px">
      <Flex
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap="4"
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Nathan Oh. All rights reserved.
        </Text>

        <Flex spaceX="8">
          <Link href="https://github.com/bathan1" color="teal.500" fontWeight="medium">
            GitHub
          </Link>
          <Link href="mailto:side_nathan@hotmail.com" color="teal.500" fontWeight="medium">
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

