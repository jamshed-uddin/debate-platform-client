import React, { Suspense } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register - UpTrack",
  description:
    "Track your journey, mark progress, stay focused and keep moving forward",
};

const Register = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/");
  }

  return (
    <div className="h-screen ">
      <div className="h-full flex items-center justify-center">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Register;
