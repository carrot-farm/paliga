"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
/** 연속 동작 대한 테스트 */
function TimelineTest2({ className }: TimelineTest2Props) {
  const box0 = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga0 } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box0.current) {
      paliga0.timeline([box0.current], {
        direction: "normal",
        x: 100,
        duration: 1000,
      });
    }

    if (box1.current) {
      paliga.timeline([box1.current], {
        direction: "reverse",
        x: 100,
        duration: 1000,
      });
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        direction: "alternate",
        x: 100,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="direction: `normal`"
        titleLink="timeline2-0"
        description="정방향으로 진행"
        onPlay={() => paliga0.play()}
      >
        <TestSection.Box ref={box0} />
      </TestSection>

      <TestSection
        title="direction: `reverse`"
        titleLink="timeline2-1"
        description="반대 방향으로 진행"
        className="mt-4"
        onPlay={() => paliga.play()}
      >
        <TestSection.Box className="absolute left-[108px]" ref={box1} />
      </TestSection>

      <TestSection
        title="direction: `alternate`"
        titleLink="timeline2-2"
        description="정방향 진행 후 역방향 진행"
        className="mt-4"
        onPlay={() => paliga2.play()}
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
