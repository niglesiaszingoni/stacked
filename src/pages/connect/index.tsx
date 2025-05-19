import { ActionBtn } from "@/components/actionBtn/ActionBtn";
import { ConnectorCard } from "@/components/connectorCard/ConnectorCard";
import { Modal } from "@/components/Modal/Modal";
import { connections } from "@/models/connections";
import { Connector } from "@/types/connections";
import Image from "next/image";
import { useState } from "react";

const Connect = () => {
  const [selected, setSelected] = useState<Connector>();
  const [showModal, setShowModal] = useState(false);

  const handleSelection = (connector: Connector) => {
    setSelected((prev) => (prev?.id === connector.id ? undefined : connector));
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center p-8 bg-primary-dark gap-12">
      <Image
        className=""
        src="/logo.png"
        width={120}
        height={15}
        alt="Next.js logo"
        priority
      />
      <div className="flex flex-col justify-around w-[400px] grow">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-3xl text-primary-light text-center leading-8 w-72">
            Select platforms to connect to Stacked
          </h1>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-primary-grey text-[16px] leading-4">
              Connect tools to manage your Legues.
            </p>
            <p className="text-primary-grey text-[16px] leading-4">
              Add at least one now, you can always add more later.
            </p>
          </div>
          {/* Connection lists */}
          <div className="flex flex-col gap-3.5 mt-3">
            {connections.map((connector) => (
              <ConnectorCard
                key={connector.id}
                connector={connector}
                isSelected={connector.id === selected?.id}
                onSelect={handleSelection}
              />
            ))}
          </div>

          <ActionBtn
            disabled={!selected}
            onClick={toggleModal}
            label="Continue"
            disableText="Add at least one platform to Continue"
          />
        </div>
      </div>
      {showModal && !!selected && (
        <Modal connector={selected} onClose={toggleModal} />
      )}
    </div>
  );
};

export default Connect;
