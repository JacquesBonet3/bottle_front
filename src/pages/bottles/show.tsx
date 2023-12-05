import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mantine";
import { Title, Tabs, Table, Text } from "@mantine/core";
import { IconPaw, IconReportSearch } from "@tabler/icons";
import React from "react";
import {wineTypeValue} from "../../components/wine-type-select/index.js";
import {producerTypeValue} from "../../components/producer-select/index.js";

export const BottleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} title={<Title size="h3">{record?.name}</Title>}>
      <Tabs defaultValue="bottle">
        <Tabs.List>
          <Tabs.Tab value="bottle" icon={<IconPaw size={14} />}>
            Bottle
          </Tabs.Tab>
          <Tabs.Tab value="notes" icon={<IconReportSearch size={14} />}>
            Notes
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="bottle" pt="xs">
          <Title size='small' my="xs" order={5}>
            Name
          </Title>
          <Text size='sm'>
            {record?.name}
          </Text>
          <Title size='small' my="xs" order={5}>
            Producer
          </Title>
          <Text size='sm'>
            {producerTypeValue(record?.producerId)}
          </Text>
          <Title size='small' my="xs" order={5}>
            Bottle Type
          </Title>
          <Text size='sm'>
            {wineTypeValue(record?.type)}
          </Text>
          <Title size='small' my="xs" order={5}>
            Note
          </Title>
          <Text size='sm'>
            {record?.note}
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="notes" pt="xs">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th key={1}>Note</th>
                <th key={2}>Created at</th>
                <th key={3}>Comment</th>
              </tr>
            </thead>
            <tbody>
              {record?.notes.map((note: any, idx: number) => (
                <tr key={idx}>
                  <td key={1}>{note.note}</td>
                  <td key={1}>{new Date(note.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
                  <td key={1}>{note.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </Show>
  );
};
