"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
/** x 축 이동에 대한 테스트 */
function TimelineTest1({ className }: TimelineTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3_0 = useRef<HTMLDivElement>(null);
  const box3_1 = useRef<HTMLDivElement>(null);
  const box3_2 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga.timeline([box1.current], {
        x: 200,
        duration: 2000,
      });
    }

    if (box2.current) {
      paliga2
        .timeline([box2.current], {
          x: 200,
          duration: 1000,
        })
        .timeline({
          y: 100,
          duration: 1000,
        });
    }

    if (box3_0.current && box3_1.current && box3_2.current) {
      paliga3.timeline([box3_0.current, box3_1.current, box3_2.current], {
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        titleLink="timeline-1-0"
        description="x축으로 200px 만큼 2000ms 동안 이동"
        onPlay={() => paliga.play()}
      >
        <TestSection.Box ref={box1} />
      </TestSection>

      <TestSection
        titleLink="timeline-1-1"
        description="x축으로 200px 만큼 이동 후 y축으로 100px 이동"
        className="mt-4"
        onPlay={() => paliga2.play()}
      >
        <TestSection.Box ref={box2} />
      </TestSection>

      <TestSection
        titleLink="timeline-1-2"
        description="여러개의 엘리먼트 이동"
        className="mt-4"
        onPlay={() => paliga3.play()}
      >
        <TestSection.Box ref={box3_0} />
        <TestSection.Box className="mt-2" ref={box3_1} />
        <TestSection.Box className="mt-2" ref={box3_2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineTest1Props = {
  /** class */
  className?: string;
};

export default TimelineTest1;
