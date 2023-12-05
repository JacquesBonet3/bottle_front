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


export const wineTypeValue = (value: number | string) => {
  const found = data.find(elem => elem.value === `${value}`)

  return found ? found.label : value
}

export const valueTypeWine = (label: string | number) => {
  const found = data.find(elem => elem.label === label)

  return found ? found.value : label
}