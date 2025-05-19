import Image from "next/image";
import { useState } from "react";
import { Signin } from "./steps/Signin";
import { Verification } from "./steps/Verification";
import { Synchronization } from "./steps/Synchronization";

interface Props {
  onClose: () => void;
  connector: { id: string; name: string; requireAuth: boolean };
}

export const Modal = ({ connector, onClose }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSignin = () => {
    if (connector.requireAuth) {
      setCurrentStep(1);
      return;
    }
    setCurrentStep(2);
  };

  const handleVerificationSuccess = () => {
    setCurrentStep(2);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="w-full h-full top-0 absolute bg-white/15" />
      {/* Modal content */}
      <div className="min-w-[480px] absolute top-[20%] bg-primary-dark p-8 rounded-lg flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={`/${connector.id}.png`}
              width={32}
              height={32}
              alt={connector.name}
              priority
            />
            <span className="text-primary-light">
              {currentStep !== 2 ? connector.name : "Downloading data"}
            </span>
          </div>
          {currentStep !== 2 && (
            <button className="cursor-pointer" onClick={onClose}>
              <Image
                src={`/close.svg`}
                width={20}
                height={20}
                alt="close"
                priority
              />
            </button>
          )}
        </div>
        {currentStep === 0 && (
          <Signin connector={connector} onSignin={handleSignin} />
        )}

        {currentStep === 1 && (
          <Verification onVerificationSuccess={handleVerificationSuccess} />
        )}

        {currentStep === 2 && <Synchronization />}
      </div>
    </>
  );
};
