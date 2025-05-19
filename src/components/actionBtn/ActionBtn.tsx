interface Props {
  disabled: boolean;
  onClick: () => void;
  label: string;
  disableText?: string;
}

export const ActionBtn = ({ onClick, disabled, disableText, label }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full h-13 bg-primary-green p-3.5 rounded-sm cursor-pointer text-primary-dark disabled:bg-[#262626] disabled:border border-white/20 disabled:text-primary-grey"
    >
      {disabled && disableText ? disableText : label}
    </button>
  );
};
