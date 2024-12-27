"use client";
import { cn, Slider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ProgressTest1({ className }: ProgressTest1Props) {
  const defaultValue = 0.3;
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const [progress, setProgress] = useState(defaultValue);

  useEffect(() => {
    if (box1.current && box2.current) {
      paliga
        .timeline([box1.current, box2.current], {
          x: 100,
          duration: 1000,
          each: (_, i) => ({ delay: i * 200 }),
        })
        .timeline({
          y: 40,
          x: 50,
          duration: 1000,
        })
        .timeline({
          x: 50,
          duration: 1000,
          each: (_, i) => ({ delay: i * 500 }),
        })
        .progress(defaultValue);
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        titleLink="progress1-0"
        description="진행도에 따라 애니메이션 진행"
        containerRef={containerRef1}
      >
        <div className="flex flex-col gap-y-2">
          <TestSection.Box ref={box1} />
          <TestSection.Box ref={box2} />
        </div>

        <Slider
          size="sm"
          color="warning"
          aria-label="animation progress control"
          className="absolute bottom-1 w-full"
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
