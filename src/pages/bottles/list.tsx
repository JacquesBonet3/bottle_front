import React, {useState} from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group, Text, Box } from "@mantine/core";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mantine";
import { wineTypeValue } from "../../components/wine-type-select/index.js";
import { producerTypeValue } from "../../components/producer-select/index.js";
import { NoteButton } from "../../components/note-button/index.js";
import { ColumnFilter, ColumnSorter } from "../../components/table/index.js";

export const BottleList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "producerId",
        accessorKey: "producerId",
        header: "Producer",
        cell: ({ getValue }) => (
          <Text weight={500}>{producerTypeValue(getValue() as number)}</Text>
        ),
      },
      {
        id: "type",
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => (
          <Text weight={500}>{wineTypeValue(getValue() as number)}</Text>
        ),
      },
      {
        id: "year",
        accessorKey: "year",
        header: "Year",
      },
      {
        id: "note",
        accessorKey: "note",
        header: "Note",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ getValue }) => (
          <Group spacing="xs" noWrap>
            <ShowButton hideText recordItemId={getValue() as string} />
            <EditButton hideText recordItemId={getValue() as string} />
            <NoteButton
              hideText
              recordItemId={getValue() as string}
            />
            <DeleteButton hideText recordItemId={getValue() as string} />
          </Group>
        ),
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group spacing="xs" noWrap>
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Box>
                          <Group spacing="xs" noWrap>
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </Group>
                        </Group>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
