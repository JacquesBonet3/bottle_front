import React from "react";
import { Select } from "@mantine/core";

export const RetailerSelect: React.FC<React.ComponentProps<typeof Select>> = (
  props
) => {
  const data = [
    { value: "1", label: "Margaux" },
    { value: "2", label: "Cheval Blanc" },
    { value: "3", label: "Haut Brion" },
    { value: "4", label: "Pape Clement" },
  ];

  return <Select {...props} value={`${props.value}`} label="Revendeur" data={data} />;
};
