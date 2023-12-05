import React from "react";
import { Select } from "@mantine/core";

const data = [
  { value: "0", label: "Red" },
  { value: "1", label: "White" },
  { value: "2", label: "Rose" },
  { value: "3", label: "Other" },
];

export const WineTypeSelect: React.FC<React.ComponentProps<typeof Select>> = (
  props
) => (
    <Select {...props} value={`${props.value}`} label="Wine Type" data={data} />
)


export const wineTypeValue = (value: number) => (
    data.find( elem => elem.value === `${value}`)?.label
)