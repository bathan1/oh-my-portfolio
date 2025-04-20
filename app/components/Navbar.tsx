import {
  Heading,
  Box,
  Flex,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { Link as RRLink } from "react-router";
import { SiGithub, SiLinkedin } from "react-icons/si"

export default function Navbar() {
  return (
    <Flex borderBottomWidth="1px" justify="space-around" py="2" cursor="pointer">
      <Link asChild variant="underline">
        <RRLink to={{
          pathname: "/",
        }}>
          <Box>
            <Heading size="3xl">Oh(n)</Heading>
          </Box>
        </RRLink>
      </Link>

      <Flex spaceX="1.5">
        <Link href="https://github.com/bathan1" target="_blank" rel="noopener noreferrer">
          <IconButton size="sm" variant="outline">
            <SiGithub />
          </IconButton>
        </Link>

        <Link href="https://www.linkedin.com/in/nathan-oh-a90b19232/" target="_blank" rel="noopener noreferrer">
          <IconButton size="sm" variant="outline">
            <SiLinkedin />
          </IconButton>
        </Link>
      </Flex>
    </Flex>
  )
}
