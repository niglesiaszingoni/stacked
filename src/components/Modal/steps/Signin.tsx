import { ActionBtn } from "@/components/actionBtn/ActionBtn";
import { Input } from "@/components/input/Input";
import { FormData } from "@/types/form";
import { useState } from "react";

interface Props {
  onSignin: () => void;
}

export const Signin = ({ onSignin }: Props) => {
  const [formData, setFormData] = useState<FormData>({ email: "", pwd: "" });

  const handleUpdateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          id="email"
          icon="email"
          onChange={handleUpdateForm}
          placeholder="Email address"
        />

        <Input
          id="pwd"
          icon="lock"
          onChange={handleUpdateForm}
          placeholder="Password"
          type="password"
        />
      </div>
      <ActionBtn
        onClick={onSignin}
        disabled={!formData.email || !formData.pwd}
        label="Sign in"
      />
    </>
  );
};
