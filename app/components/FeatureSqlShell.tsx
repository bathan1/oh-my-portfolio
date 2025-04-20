import {
  Box,
  Button,
  Code,
  Separator,
  Flex,
  Heading,
  Textarea,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { medfetch } from "medfetch/sqlite-wasm";
import { useMutation } from "@tanstack/react-query";
import { Effect } from "effect";
import { DataTable } from "./DataTable";

const sql = medfetch("https://r4.smarthealthit.org/");
const INITIAL_QUERY = 
`
-- Practitioner's cleaned
SELECT
    id,
    json -> 'meta' ->> 'lastUpdated' AS last_updated,
    (json -> 'name' -> 0 -> 'given' ->> 0) 
    || ' '
    || (json -> 'name' -> 0 ->> 'family') AS name,

    -- JSON extracts to get address into 1 column
    (json -> 'address' -> 0 -> 'line' ->> 0)
    || ' '
    || (json -> 'address' -> 0 ->> 'city') 
    || ' '
    || (json -> 'address' -> 0 ->> 'state') 
    || ' '
    || (json -> 'address' -> 0 ->> 'postalCode') AS address
FROM medfetch('Practitioner');`

export function FeatureSqlShell() {
  const [query, setQuery] = useState(INITIAL_QUERY);
  const { data, mutate, isPending } = useMutation({
    mutationFn: () => sql`${query}`.pipe(Effect.runPromise),
  });

  return (
    <Box
      w="full"
      px={{ base: 4, md: 12 }}
      py="10"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Box textAlign="center" my="8">
        <Heading size="7xl">Featured Project: <Text as="span" color="orange">Medfetch.js</Text></Heading>
        <Text color="gray-600" fontSize="2xl">Pull <Link>FHIR</Link> data and flatten it directly from your browser with SQLite!</Text>
        <Text color="gray" fontSize="sm">Write in any SQL query and hit run to get your results!</Text>
      </Box>
      <Box
        w="full"
        maxW="6xl"
        mx="auto"
        p="8"
        rounded="lg"
        shadow="lg"
        borderWidth="1px"
      >
        <Heading size="2xl" mb="4">
          SQLite Shell (running on <Link href="https://github.com/sqlite/sqlite-wasm"><Code size="lg">@sqlite.org/sqlite-wasm</Code></Link>)
        </Heading>

        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write your SQL query here..."
          fontFamily="mono"
          fontSize="lg"
          mb="4"
          minH="lg"
        />

        <Flex justify="flex-end" mb="4">
          <Button colorScheme="teal" onClick={() => mutate()} loading={isPending}>
            Run
          </Button>
        </Flex>

        <Separator mb="3" />
        <Text fontSize="md" mb="1" color="gray.500">
          Output:
        </Text>

        <DataTable 
          rows={data as any[]} 
          columns={data && data.length > 0 ? Object.keys(data[0]!) : []}
        />
      </Box>
    </Box>
  );
}

