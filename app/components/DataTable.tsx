import {
  Table,
  Box,
  Text,
  Pagination,
  ButtonGroup,
  IconButton,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type DataTableProps = {
  columns: string[];
  rows?: Record<string, any>[];
  size?: "sm" | "md" | "lg";
};

export function DataTable({ columns, rows = [], size = "md" }: DataTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const start = (page - 1) * pageSize;
  const paginatedRows = rows.slice(start, start + pageSize);

  if (!columns.length || !rows.length) {
    return (
      <Box p="4" borderWidth="1px" rounded="md">
        <Text>No data to display.</Text>
      </Box>
    );
  }

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Result Set</Heading>
      <Table.Root size={size} interactive striped>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader key={col}>{col}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedRows.length > 0 ? (
            paginatedRows.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {columns.map((col) => (
                  <Table.Cell
                    key={col}
                    px="2"
                    py="1"
                    fontSize="sm"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                  >
                    {typeof row[col] === "object" && row[col] !== null
                      ? JSON.stringify(row[col], null, 2)
                      : String(row[col])}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length}>
                  <Text fontSize="sm" color="gray.500">
                    No data available.
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
        count={rows.length}
        pageSize={pageSize}
        page={page}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous page" onClick={() => setPage(page => page === 1 ? page : page - 1)}>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) =>
              <IconButton
                variant={{ base: "ghost", _selected: "outline" }}
                onClick={() => setPage(page.value)}
              >
                {page.value}
              </IconButton>
            }
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next page" onClick={() => setPage(page => page === Math.ceil(rows.length / page) ? page : page + 1)}>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
}

