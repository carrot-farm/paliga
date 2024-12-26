"use client";
import { cn, Slider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ProgressTest1({ className }: ProgressTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const [progress, setProgress] = useState(0.4);

  useEffect(() => {
    if (box1.current && box2.current) {
      paliga
        .animate([box1.current, box2.current], {
          x: 100,
          duration: 1000,
          each: (_, i) => ({ delay: i * 200 }),
        })
        .animate({
          y: 40,
          x: 50,
          duration: 1000,
          each: (_, i) => ({ delay: i * 200 }),
        })
        .animate({
          x: 50,
          duration: 1000,
          each: (_, i) => ({ delay: i * 200 }),
        })
        .progress(0.4);
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        titleLink="progress1-0"
        description="진행도에 따라 애니메이션 진행"
        containerRef={containerRef1}
        classNames={{ container: "flex flex-col gap-y-2" }}
      >
        <TestSection.Box ref={box1} />
        <TestSection.Box ref={box2} />

        <Slider
          size="sm"
          color="warning"
          aria-label="animation progress control"
          className="absolute bottom-1 w-[calc(100%-20px)]"
          minValue={0}
          maxValue={1}
          step={0.01}
          value={progress}
          onChange={(v) => typeof v === "number" && (paliga.progress(v), setProgress(v))}
          startContent={<span className="text-xs text-gray-400">0</span>}
          endContent={<span className="text-xs text-gray-400">{progress}</span>}
        />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ProgressTest1Props = {
  /** class */
  className?: string;
};

export default ProgressTest1;
