import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function getTrendIcon(
  trend: string,
  size?: "small" | "inherit" | "large" | "medium"
) {
  switch (trend) {
    case "up":
      return <ArrowDropUpIcon fontSize={size} />;
    case "down":
      return <ArrowDropDownIcon fontSize={size} />;
    default:
      break;
  }
}
