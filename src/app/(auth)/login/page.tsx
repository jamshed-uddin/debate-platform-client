import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Open Debate",
  description: "",
};

const Login = async () => {
  return (
    <div className="flex-grow flex items-center justify-center ">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
