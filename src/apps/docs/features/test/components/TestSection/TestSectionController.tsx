"use client";
import { Button, cn, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { Paliga } from "../../../../../../core/Paliga";

/** ===== Components ===== */
function TestSectionController({
  className,
  defaultProgress = 0,
  paliga,
  onPlay,
  onPause,
}: TestSectionControllerProps) {
  const [state, setState] = useState<"idle" | "running" | "paused">("idle");
  const [progress, setProgress] = useState(defaultProgress);
  const [isReady, setIsReady] = useState(false);

  const hanelClick = () => {
    if (onPlay && state !== "running") {
      onPlay({ paliga });
    }

    if (state === "running") {
      paliga.pause();
      if (onPause) {
        onPause({ paliga });
      }
    } else {
    }
  };

  // # 옵저버 등록
  useEffect(() => {
    if (isReady) {
      return;
    }

    paliga.observeFrame(({ progress, state }) => {
      setState(state);
      setProgress(progress);
    });
    setIsReady(true);
  }, [paliga, isReady]);

  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      <Slider
        size="sm"
        color="warning"
        aria-label="animation progress control"
        className="flex-1"
        minValue={0}
        maxValue={1}
        step={0.01}
        value={progress}
        onChange={(v) => typeof v === "number" && (paliga.progress(v), setProgress(v))}
        startContent={
          <Button size="sm" variant="light" color="warning" isIconOnly onPress={hanelClick}>
            {state === "running" ? <IoPause /> : <IoPlay />}
          </Button>
        }
        endContent={<span className="text-xs text-gray-400">{progress.toFixed(2)}</span>}
      />
    </div>
  );
}

TestSectionController.prototype.displayName = "Controller";

/** ===== Others ===== */

/** ===== Types ===== */
export type TestSectionControllerProps = {
  /** class */
  className?: string;
  /** progress */
  defaultProgress?: number;
  /** paliga */
  paliga: Paliga;
  /** play click */
  onPlay?: (data: { paliga: Paliga }) => void;
  /** onPause click */
  onPause?: (data: { paliga: Paliga }) => void;
};

export default TestSectionController;
