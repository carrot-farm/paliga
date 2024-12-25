"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest7({ className }: TimelineTest7Props) {
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement[]>([]);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      const startX = 0;
      const endX = 210;
      const startY = 0;
      const maxY = 90;

      paliga.animate([box1.current], {
        x: 200,
        duration: 1000,
        onFrame: ({ progress }) => ({
          x: startX + (endX - startX) * progress,
          y: startY - maxY * (4 * progress * (1 - progress)),
        }),
      });
    }

    if (box2.current) {
      paliga2.animate(box2.current, {
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="onFrame()"
        titleLink="timeline5-0"
        description="매프레임마다 적용되는 값을 변경"
        onPlay={() => paliga.play()}
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
const each = [
  { x: 50, delay: 0 },
  { x: 100, delay: 200 },
  { x: 150, delay: 300 },
];

/** ===== Types ===== */
export type TimelineTest7Props = {
  /** class */
  className?: string;
};

export default TimelineTest7;
