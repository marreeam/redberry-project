"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/component/ui/Input";
import PrimaryButton from "@/component/ui/button";
import AvatarPicker from "./component/AvatarPicker";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    if (avatarFile) {
      formData.append("avatar", avatarFile); 
    }
    
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

      <PrimaryButton text="Register" />
    </form>
  );
};

export default Register;
