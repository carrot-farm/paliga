"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest4({ className }: TimelineTest4Props) {
  const box1 = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(className)}>
      <TestSection
        title="iteration: `number`"
        titleLink="timeline4-0"
        description="지정된 횟수 만큼 애니메이션을 반복. (반복 시 종료되는 지점에서 추가)"
        onReady={({ paliga }) =>
          paliga.timeline([box1.current!], {
            iteration: 2,
            direction: "alternate",
            x: 200,
            duration: 1000,
          })
        }
        onPlay={({ paliga }) => {
          paliga?.play();
        }}
      >
        <TestSection.Box ref={box1}> 2</TestSection.Box>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineTest4Props = {
  /** class */
  className?: string;
};

export default TimelineTest4;
