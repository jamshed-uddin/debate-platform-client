"use client";
import { ReactNode } from "react";

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default ClientWrapper;
