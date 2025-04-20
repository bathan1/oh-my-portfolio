'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function Hero() {
  return (
    <>
      <Container maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spaceX={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            I'm <Text as="span" color="red.400">Nathan</Text>, and I like to make stuff 

            <Text as={'span'} color={'green.400'}>
              {" "} happen
            </Text>
              {" "}
            on computers.
          </Heading>
          <Text color={'gray.500'} fontSize="2xl">
            Not your average Fullstack software engineer!
            See my works below to see what I've been up to recently.
          </Text>
        </Stack>
      </Container>
    </>
  )
}

