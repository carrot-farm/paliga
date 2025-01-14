"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest6({ className }: TimelineTest6Props) {
  const box1 = useRef<HTMLDivElement[]>([]);

  return (
    <div className={cn(className)}>
      <TestSection
        title="each()"
        titleLink="timeline5-0"
        description="각 엘리먼트별 애니메이션 지정"
        onReady={({ paliga }) => {
          paliga.timeline(box1.current, {
            x: 200,
            duration: 1000,
            each: (_, i) => each[i],
          });
        }}
        onPlay={({ paliga }) => {
          paliga?.play();
        }}
      >
        {each.map((a, i) => (
          <TestSection.Box
            key={`${a}-${i}`}
            className={cn(i > 0 && "mt-2")}
            ref={(el) => {
              if (el) {
                box1.current.push(el);
              }
            }}
          >
            x:{a.x} / delay:{a.delay}
          </TestSection.Box>
        ))}
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
export type TimelineTest6Props = {
  /** class */
  className?: string;
};

export default TimelineTest6;
