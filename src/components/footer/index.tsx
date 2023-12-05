import React from "react";
import { Text } from "@mantine/core";

export const Footer: React.FC = () => {
  const divStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
  };

  return (
    <div style={divStyle}>
      <Text>
        Bottles @ {new Date().getFullYear()} ― MIT licensed, open source project
        created by{" "}
        <Text component="a" variant="link" href="https://github.com/JacquesBonet3?tab=repositories">
          Jacques BONET
        </Text>
        .
      </Text>
    </div>
  );
};
