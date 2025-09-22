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
  const [avatar, setAvatar] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log({ ...data, avatar }); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <AvatarPicker onChange={(base64) => setAvatar(base64)} />

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
