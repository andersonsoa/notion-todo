import React from "react";
import Header from "next/head";

interface LayoutProps {
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title = "Todo List" }) => {
  return (
    <>
      <Header>
        <title>{title}</title>
      </Header>

      {children}
    </>
  );
};
