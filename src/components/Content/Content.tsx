import React from "react";

interface IContent {
  children?: any;
  padding?: number | string;
}

export default function Content({ children, padding }: IContent) {
  const contentStyles = {
    padding: `${padding}px`,
  };

  return (
    <div className="content" style={contentStyles}>
      {children}
    </div>
  );
}

Content.defaultProps = {
  padding: 0,
};
