"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest7({ className }: TimelineTest7Props) {
  const box1 = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn(className)}>
      <TestSection
        title="onFrame()"
        titleLink="timeline5-0"
        description="매프레임마다 적용되는 값을 변경"
        onReady={({ paliga }) => {
          const startX = 0;
          const endX = 210;
          const startY = 0;
          const maxY = 80;

          paliga.timeline([box1.current!], {
            x: 200,
            duration: 1000,
            onFrame: ({ progress }) => ({
              x: startX + (endX - startX) * progress,
              y: startY - maxY * (4 * progress * (1 - progress)),
            }),
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box
          key={`timeline7-0`}
          className="absolute top-[110px]"
          ref={box1}
        ></TestSection.Box>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineTest7Props = {
  /** class */
  className?: string;
};

export default TimelineTest7;
