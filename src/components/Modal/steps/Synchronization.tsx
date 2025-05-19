import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InitialSyncDetail, ModalSyncSteps } from "@/models/modal";
import { SyncDetailStep, SyncStep } from "@/types/synchronization";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Synchronization = () => {
  const [syncSteps, setSyncSteps] = useState<SyncStep[]>(ModalSyncSteps);
  const [stepSyncDetail, setStepSyncDetail] = useState<SyncDetailStep[]>([]);

  useEffect(() => {
    const nextStepToSimulate = syncSteps.find(
      (step) => step.state === "initial"
    );
    const isStepLoading = syncSteps.find((step) => step.state === "loading");

    if (nextStepToSimulate && !isStepLoading) {
      if (nextStepToSimulate.hasExtraData) {
        setStepSyncDetail(InitialSyncDetail);
      }
      setSyncSteps((prev) =>
        prev.map((step) =>
          step.id === nextStepToSimulate.id
            ? { ...step, state: "loading" }
            : step
        )
      );
      if (!nextStepToSimulate.hasExtraData) {
        simulateDownloadingDataProcess(nextStepToSimulate.id);
      }
    }
  }, [syncSteps]);

  const simulateDownloadingDataProcess = (id?: string) => {
    const currentSyncStep = id ?? 1;
    setTimeout(() => {
      setSyncSteps((prev) =>
        prev.map((step) =>
          step.id === currentSyncStep ? { ...step, state: "success" } : step
        )
      );
    }, 3000);
  };

  useEffect(() => {
    const nextStepToSimulate = stepSyncDetail.find(
      (step) => step.state === "initial"
    );
    const activeDetail = stepSyncDetail.find(
      (step) => step.state === "loading"
    );

    if (activeDetail && activeDetail.loaded !== 100) {
      simulateDetailProgress(activeDetail.id);
      return;
    }
    if (nextStepToSimulate) {
      setStepSyncDetail((prev) =>
        prev.map((step) =>
          step.id === nextStepToSimulate.id
            ? { ...step, state: "loading" }
            : step
        )
      );
      simulateDetailProgress(nextStepToSimulate.id);
      return;
    }

    if (
      stepSyncDetail.length > 0 &&
      stepSyncDetail.every((detail) => detail.state === "success")
    ) {
      setSyncSteps((prev) =>
        prev.map((step) =>
          step.id === "3" ? { ...step, state: "success" } : step
        )
      );
    }
  }, [stepSyncDetail]);

  const simulateDetailProgress = (id?: number) => {
    const currentSyncStep = id ?? 1;
    setTimeout(() => {
      setStepSyncDetail((prev) =>
        prev.map((step) => {
          const percentage = step.loaded + 10;
          const state = percentage >= 100 ? "success" : "loading";
          return step.id === currentSyncStep
            ? { ...step, loaded: percentage, state }
            : step;
        })
      );
    }, 1000);
  };

  const calculateEstimateTime = (percentage: number) => {
    return (100 - percentage) / 10;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {syncSteps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col relative overflow-hidden items-center justify-between w-full min-h-[80px] rounded-lg p-6 bg-[#141414] gap-4"
        >
          {step.state === "loading" && (
            <div className="w-[380px] h-[80px] absolute left-0 top-0">
              <FlickeringGrid
                className="absolute inset-0 z-0 size-full"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={800}
                width={800}
              />
            </div>
          )}
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-4 ">
              <div className="flex flex-col gap-0.5">
                <span className="text-lg text-primary-light">{step.name}</span>
                {/* {connection.requireAuth && (
                        <span className="text-[#9D9D95] text-xs">2FA required</span>
                      )} */}
              </div>
            </div>
            {step.state === "success" && (
              <div className="w-7 h-7 flex justify-center rounded-sm bg-white/10 hover:bg-white/15">
                <Image
                  src={`/checkmark.svg`}
                  width={16}
                  height={16}
                  alt={"checkmark"}
                  priority
                />
              </div>
            )}
          </div>
          {step.hasExtraData && step.state !== "initial" && (
            <div className="flex flex-col gap-3 p-3 w-full bg-[#262626] z-20">
              {stepSyncDetail.map((detail) => (
                <div
                  key={detail?.name}
                  className="flex justify-between pb-1 [&:not(:last-child)]:border-b-[1px] border-b-[#404040]"
                >
                  <div className="flex flex-col text-primary-lighttext-sm">
                    <span
                      className={`${
                        detail.state === "success"
                          ? "text-primary-green"
                          : "text-[#E5E5DD]"
                      }`}
                    >
                      {detail?.name}
                    </span>
                    {detail.loaded > 0 && detail.loaded < 100 && (
                      <span className="text-primary-grey">{`${
                        detail.loaded
                      }% - ${calculateEstimateTime(
                        detail.loaded
                      )}s left`}</span>
                    )}
                  </div>
                  {(detail.state === "success" ||
                    detail.state === "loading") && (
                    <Image
                      className={`${
                        detail.state === "loading" && "animate-spin"
                      }`}
                      src={`/${
                        detail.state === "success" ? "checkmark" : "loading"
                      }.svg`}
                      width={16}
                      height={16}
                      alt={"checkmark"}
                      priority
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <span className="text-sm text-primary-grey">
        We’ll redirect you once done.
      </span>
    </div>
  );
};
