"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineTest4({ className }: TimelineTest4Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga.timeline([box1.current], {
        iteration: 2,
        direction: "alternate",
        x: 200,
        duration: 1000,
      });
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        direction: "alternate",
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="iteration: `number`"
        titleLink="timeline4-0"
        description="지정된 횟수 만큼 애니메이션을 반복. (반복 시 종료되는 지점에서 추가)"
        onPlay={() => {
          paliga.play();
        }}
      >
        <TestSection.Box ref={box1} />
      </TestSection>

      <TestSection
        title="play({ infinity: `true` })"
        titleLink="timeline4-1"
        description="무한 애니메이션 반복. (모든 애니메이션 종료 후 다시 시작)"
        className="mt-4"
        onPlay={() => {
          paliga2.play({ iteration: Infinity });
        }}
      >
        <TestSection.Box ref={box2} />
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
