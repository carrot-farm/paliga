"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { TTransition } from "../../../../../../types";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest5({ className }: TimelineTest5Props) {
  // const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const boxes = useRef<HTMLDivElement[]>([]);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (boxes.current.length > 0) {
      paliga.timeline(boxes.current, {
        x: 200,
        duration: 1000,
        each: (_, i) => ({ easing: easing[i] }),
      });
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        easing: [0.68, -0.55, 0.265, 1.55],
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="easing: `linear` | `ease` | `...`"
        titleLink="timeline5-0"
        description="여러 easing을 지원"
        onPlay={() => {
          paliga.play();
        }}
      >
        {easing.map((a, i) => (
          <TestSection.Box
            key={`${a}-${i}`}
            className={cn(i > 0 && "mt-2")}
            ref={(el) => {
              if (el) {
                boxes.current.push(el);
              }
            }}
          >
            {a}
          </TestSection.Box>
        ))}
      </TestSection>

      <TestSection
        title="easing: `[number, number, number, number]`"
        titleLink="timeline5-1"
        description="`cubic-bezier()` 적용"
        className="mt-4"
        onPlay={() => {
          paliga2.play();
        }}
      >
        <TestSection.Box ref={box2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */
const easing: TTransition["easing"][] = [
  "linear",
  "ease",
  "easeIn",
  "easeOut",
  "easeInOut",
  "easeInBounce",
  "easeOutBounce",
];

/** ===== Types ===== */
export type TimelineTest5Props = {
  /** class */
  className?: string;
};

export default TimelineTest5;
