import { ActionBtn } from "@/components/actionBtn/ActionBtn";
import { Connector } from "@/types/connections";
import { FormData } from "@/types/form";
import Image from "next/image";
import { useState } from "react";

interface Props {
  connector: Connector;
  onSignin: () => void;
}

export const Signin = ({ connector, onSignin }: Props) => {
  const [formData, setFormData] = useState<FormData>({ email: "", pwd: "" });

  const handleUpdateForm = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center h-10 gap-2 bg-white/10 p-2.5 rounded-sm">
          <Image
            src="/email.svg"
            width={20}
            height={20}
            alt={connector.name}
            priority
          />
          <input
            onChange={(e) => handleUpdateForm("email", e.target.value)}
            className="grow focus:outline-0 text-primary-light"
            placeholder="Email address"
          />
        </div>
        <div className="flex items-center h-10 gap-2 bg-white/10 p-2.5 rounded-sm">
          <Image
            src="/lock.svg"
            width={20}
            height={20}
            alt={connector.name}
            priority
          />
          <input
            onChange={(e) => handleUpdateForm("pwd", e.target.value)}
            type="password"
            className="grow focus:outline-0 text-primary-light "
            placeholder="Password"
          />
        </div>
      </div>
      <ActionBtn
        onClick={onSignin}
        disabled={!formData.email || !formData.pwd}
        label="Sign in"
      />
    </>
  );
};
