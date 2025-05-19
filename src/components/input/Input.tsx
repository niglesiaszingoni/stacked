import Image from "next/image";

interface Props {
  id: string;
  autofocus?: boolean;
  type?: string;
  icon: string;
  placeholder: string;
  onChange: (key: string, value: string) => void;
}

export const Input = ({
  id,
  placeholder,
  icon,
  type = "text",
  autofocus = false,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center h-10 gap-2 bg-white/10 p-2.5 rounded-sm">
      <Image src={`/${icon}.svg`} width={20} height={20} alt={id} priority />
      <input
        autoFocus={autofocus}
        type={type}
        onChange={(e) => onChange(id, e.target.value)}
        className="grow focus:outline-0 text-primary-light"
        placeholder={placeholder}
      />
    </div>
  );
};
