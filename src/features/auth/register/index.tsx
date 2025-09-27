"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/component/ui/Input";
import PrimaryButton from "@/component/ui/button";
import AvatarPicker from "./component/AvatarPicker";
import { useRegister } from "./hook/useRegister";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const registerMutation = useRegister(
    (data) => console.log("Registration successful:", data),
    (err) => console.error("Registration failed:", err)
  );

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    registerMutation.mutate({ ...data, avatar: avatarFile || undefined });
  };

  return (
    <div className="flex items-center gap-x-44">
      <img src="/svg/login-registration.svg" alt="Registration Illustration" className="hidden md:block" />

      <div className="flex flex-col gap-12">
        <h1 className="text-[#10151F] .text-poppins-semibold-42">
          Registration
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          <AvatarPicker onChange={(_, file) => setAvatarFile(file)} />

          <Input {...register("username")}   placeholderText="Username" required />
          <Input {...register("email")} placeholderText="Email" required />
          <Input {...register("password")} placeholderText="Password" required type="password" />
          <Input {...register("password_confirmation")} placeholderText="Confirm password" required type="password"/>

          {registerMutation.isPending  && <p>Registering...</p>}
          {registerMutation.isError && (
            <p className="text-red-500 text-sm">
              {(registerMutation.error as any)?.response?.data?.message || "Registration failed"}
            </p>
          )}
          {registerMutation.isSuccess && (
            <p className="text-green-600 text-sm">Registration successful!</p>
          )}

          <PrimaryButton text={registerMutation.isPending ? "Registering..." : "Register"} />
        </form>
      </div>
    </div>
  );
};

export default Register;
