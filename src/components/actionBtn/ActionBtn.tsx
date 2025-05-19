interface Props {
  disabled: boolean;
  onClick: () => void;
  label: string;
}

export const ActionBtn = ({ onClick, disabled, label }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full h-12 bg-primary-green p-3.5 rounded-sm cursor-pointer text-primary-dark disabled:opacity-50"
    >
      {label}
    </button>
  );
};
