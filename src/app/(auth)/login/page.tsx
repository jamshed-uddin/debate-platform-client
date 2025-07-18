import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Open Debate",
  description: "",
};

const Login = async () => {
  return (
    <div className="h-screen ">
      <div className="h-full flex items-center justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Login;
