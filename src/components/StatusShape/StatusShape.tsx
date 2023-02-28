import React from "react";
import "./status-shape.scss";

interface IStatusShape {
  status: string;
  size: string;
  children?: any;
}

export default function StatusShape({ status, size, children }: IStatusShape) {
  return (
    <div className={`status-shape status-${status} ${size}`}>{children}</div>
  );
}

StatusShape.defaultProps = {
  size: "small",
};
