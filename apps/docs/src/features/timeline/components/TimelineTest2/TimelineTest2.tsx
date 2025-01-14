"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
/** 연속 동작 대한 테스트 */
function TimelineTest2({ className }: TimelineTest2Props) {
  const box0 = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="direaction"
        titleLink="timeline2-0"
        description="direction: `normal` - 정방향으로 진행"
        onReady={({ paliga }) =>
          box0.current &&
          paliga.timeline([box0.current], {
            direction: "normal",
            x: 100,
          })
        }
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box0} />
      </TestSection>

      <TestSection
        titleLink="timeline2-1"
        description="direction: `reverse` - 반대 방향으로 진행"
        onReady={({ paliga }) =>
          box1.current &&
          paliga.timeline([box1.current], {
            direction: "reverse",
            x: 100,
          })
        }
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box className="absolute left-[108px]" ref={box1} />
      </TestSection>

      <TestSection
        titleLink="timeline2-2"
        description="direction: `alternate` - 정방향 진행 후 역방향 진행"
        onReady={({ paliga }) =>
          box2.current &&
          paliga.timeline([box2.current], {
            direction: "alternate",
            x: 100,
          })
        }
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineTest2Props = {
  /** class */
  className?: string;
};

export default TimelineTest2;
