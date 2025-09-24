"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/component/ui/Input";
import PrimaryButton from "@/component/ui/button";
import { useLogin } from "@/services/authService";

interface LoginFormValues {
  email: string;
  password: string;
  
}

const USER_KEY = "currentUserAvatar"; 

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const loginMutation = useLogin(
    (data) =>{window.location.href="/"; console.log("SUCCESS", data) },

    (err) => console.error("ERROR", err)
  );

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center gap-x-44">
      <img src="/svg/login-registration.svg" alt="Login Illustration" className="hidden md:block" /> 

      <div className="flex flex-col gap-12">
        <h1 className="text-[#10151F] font-semibold text-[42px] leading-[100%] tracking-[0%]">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            {...register("email", { required: "Email is required" })}
            placeholderText="Email"
            errorText={errors.email?.message}
          />

          <Input
            {...register("password", { required: "Password is required" })}
            placeholderText="Password"
            isPassword
            errorText={errors.password?.message}
          />

          {loginMutation.isError && (
            <p className="text-red-500">
              {(loginMutation.error as any)?.response?.data?.message || "Login failed"}
            </p>
          )}

          <PrimaryButton text={loginMutation.isLoading ? "Logging in..." : "Login"} />
        </form>

        <p className="font-medium text-[14px] leading-[100%] tracking-[0%] text-center text-[#3E424A]">
          Not a member yet? <a href="/register" className="text-[#FF4000] font-medium">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
