"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ReverseTest1({ className }: ReverseTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="Reverse()"
        titleLink="methods-reverse-0"
        description="애니메이션의 진행방향을 변경"
        onReady={({ paliga }) =>
          box1.current &&
          paliga
            .timeline([box1.current], {
              x: 200,
            })
            .play({ iteration: Infinity })
        }
        onPlay={({ paliga }) => paliga?.reverse()}
      >
        <TestSection.Box key={`play2-0`} ref={box1} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReverseTest1Props = {
  /** class */
  className?: string;
};

export default ReverseTest1;
