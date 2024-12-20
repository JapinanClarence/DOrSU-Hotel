import React, { useLayoutEffect } from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // if user exists navigate to homepage
  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        
        <SignupForm className={"shadow-lg"} />
      </div>
    </div>
  );
};

export default SignupPage;
