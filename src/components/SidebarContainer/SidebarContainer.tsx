import React from "react";
import "./sidebar-container.scss";

interface ISidebarContainer {
  style?: object;
  title?: string | React.ReactNode;
  children?: any;
}

export default function SidebarContainer({
  style,
  title,
  children,
}: ISidebarContainer) {
  return (
    <div className="sidebar-container" style={style}>
      {title && <h4 className="container-title">{title}:</h4>}
      {children}
    </div>
  );
}
