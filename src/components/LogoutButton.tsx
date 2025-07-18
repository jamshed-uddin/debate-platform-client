"use client";

import { userSignOut } from "@/lib/actions";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await userSignOut();
  };
  return (
    <button onClick={handleLogout} className="block w-full text-start">
      Logout
    </button>
  );
};

export default LogoutButton;
