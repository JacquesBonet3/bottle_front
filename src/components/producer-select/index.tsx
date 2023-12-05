import React from "react";
import { Select } from "@mantine/core";

const data = [
  { value: "1", label: "Margaux" },
  { value: "2", label: "Cheval Blanc" },
  { value: "3", label: "Haut Brion" },
  { value: "4", label: "Pape Clement" },
];

export const ProducerSelect: React.FC<React.ComponentProps<typeof Select>> = (
  props
) => (
  <Select {...props} value={`${props.value}`} label="Chateau" data={data} />
)

export const producerTypeValue = (value: number) => (
    data.find( elem => elem.value === `${value}`)?.label
)