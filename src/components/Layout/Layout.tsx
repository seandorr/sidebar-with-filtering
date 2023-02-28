import React from "react";

export interface ILayout {
  children: React.ReactNode;
  sidebar?: boolean;
  sidebarWidth?: number;
}

export default function Layout({ children, sidebar, sidebarWidth }: ILayout) {
  const layoutStyles = {
    display: "grid",
    gridTemplateColumns: `${sidebarWidth}px auto`,
  };

  return (
    <div className="layout" style={sidebar && layoutStyles}>
      {children}
    </div>
  );
}
