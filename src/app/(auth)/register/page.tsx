import React, { Suspense } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register - Open Debate",
  description: "Space for thoughtful disagreement",
};

const Register = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/");
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center ">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default Register;
