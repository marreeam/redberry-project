"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/component/ui/Input";
import PrimaryButton from "@/component/ui/button";
import AvatarPicker from "./component/AvatarPicker";
import { useRegister, RegisterData } from "@/services/authService";

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <AvatarPicker onChange={(_, file) => setAvatarFile(file)} />

      <Input {...register("username")} placeholder="Username" required />
      <Input {...register("email")} placeholder="Email" required />
      <Input {...register("password")} placeholder="Password" required type="password" />
      <Input
        {...register("password_confirmation")}
        placeholder="Confirm password"
        required
        type="password"
      />

{registerMutation.isLoading && <p>Registering...</p>}
{registerMutation.isError && (
  <p className="text-red-500 text-sm">
    {(registerMutation.error as any)?.response?.data?.message || "Registration failed"}
  </p>
)}
{registerMutation.isSuccess && (
  <p className="text-green-600 text-sm">Registration successful!</p>
)}


<PrimaryButton text={registerMutation.isLoading ? "Registering..." : "Register"} />
{registerMutation.isLoading && <p>Registering...</p>}
{registerMutation.isError && (
  <p className="text-red-500 text-sm">
    {(registerMutation.error as any)?.response?.data?.message || "Registration failed"}
  </p>
)}
{registerMutation.isSuccess && <p className="text-green-600 text-sm">Registration successful!</p>}



    </form>
  );
};

export default Register;
