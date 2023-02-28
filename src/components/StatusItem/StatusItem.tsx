import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import StatusShape from "../StatusShape/StatusShape";
import "./status-item.scss";
import { getTrendIcon } from "../../utils/functions/getTrendIcon";

interface IStatusItem {
  active?: boolean;
  onClick?: () => void;
  status: string;
  closable?: boolean;
  itemText: string;
  trend?: string;
  size?: "small" | "inherit" | "large" | "medium";
}

export default function StatusItem({
  active,
  onClick,
  status,
  closable,
  itemText,
  trend,
  size,
}: IStatusItem) {
  if (onClick) {
    return (
      <button
        className={`status-item hoverable ${active ? "active" : ""}`}
        onClick={onClick}
        tabIndex={0}
      >
        <div className="status-info-container">
          <StatusShape status={status}>
            {trend && getTrendIcon(trend, size)}
          </StatusShape>
          <span>{itemText}</span>
        </div>

        {closable && active && (
          <CloseIcon className="close-icon" fontSize="small" />
        )}
      </button>
    );
  } else {
    return (
      <div className="status-item">
        <div className="status-info-container">
          <StatusShape status={status} size={size}>
            {trend && getTrendIcon(trend, size)}
          </StatusShape>
          <span>{itemText}</span>
        </div>
      </div>
    );
  }
}
