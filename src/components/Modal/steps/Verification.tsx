import { useRef } from "react";

interface Props {
  onVerificationSuccess: () => void;
}

export const Verification = ({ onVerificationSuccess }: Props) => {
  const authCode = useRef<number[]>([]);

  const handleInputChange = (index: number, value: string) => {
    authCode.current[index] = Number(value);

    if (authCode.current.length === 6) {
      onVerificationSuccess();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg text-primary-grey">
        Enter a 6-digit code sent to email@address.com
      </span>
      <div className="flex gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            className="w-[62px] text-primary-light flex text-center h-20 bg-white/10 p-2.5 rounded-sm text-4xl [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            key={index}
            type="number"
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};
