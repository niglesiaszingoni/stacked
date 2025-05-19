import { Connector } from "@/types/connections";
import Image from "next/image";

interface Props {
  connector: Connector;
  isSelected: boolean;
  onSelect: (connector: Connector) => void;
}

export const ConnectorCard = ({ connector, onSelect, isSelected }: Props) => {
  return (
    <div
      className="flex items-center justify-between w-[380px] h-[80px] rounded-lg p-6 bg-[#141414]"
      key={connector.id}
    >
      <div className="flex items-center gap-4 ">
        <Image
          src={`/${connector.id}.png`}
          width={32}
          height={32}
          alt={connector.name}
          priority
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-lg text-primary-light">{connector.name}</span>
          {connector.requireAuth && (
            <span className="text-primary-grey text-xs">2FA required</span>
          )}
        </div>
      </div>
      <button
        onClick={() => onSelect(connector)}
        className="w-7 h-7 flex justify-center rounded-sm bg-white/10 cursor-pointer hover:bg-white/15"
      >
        <Image
          src={`/${isSelected ? "checkmark" : "plus"}.svg`}
          width={16}
          height={16}
          alt={connector.name}
          priority
        />
      </button>
    </div>
  );
};
