import DebateForm from "@/components/DebateForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create debate- Open Debate",
  description: "Space for thoughtful disagreement",
};

const CreateDebatePage = () => {
  return (
    <div>
      <DebateForm />
    </div>
  );
};

export default CreateDebatePage;
