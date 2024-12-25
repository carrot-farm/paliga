"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
/** x 축 이동에 대한 테스트 */
function TimelineTest3({ className }: TimelineTest3Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3_0 = useRef<HTMLDivElement>(null);
  const box3_1 = useRef<HTMLDivElement>(null);
  const box3_2 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();

  useEffect(() => {
    if (box1.current && box2.current) {
      paliga.animate([box1.current], {
        x: 200,
        duration: 2000,
      });

      paliga2.animate([box2.current], {
        x: 200,
        duration: 1000,
        delay: 1000,
      });
    }

    if (box3_0.current && box3_1.current && box3_2.current) {
      paliga3.animate([box3_0.current, box3_1.current, box3_2.current], {
        x: 200,
        duration: 1000,
        each: (_, i) => ({ delay: i * 200 }),
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="delay: `number`"
        titleLink="timeline3-0"
        description="지정된 시간(ms)만큼 애니메이션의 시작 시간을 지연"
        onPlay={() => {
          paliga.play();
          paliga2.play();
        }}
      >
        <TestSection.Box ref={box1} />
        <TestSection.Box className="mt-2 bg-danger" ref={box2} />
      </TestSection>

      <TestSection
        title="each"
        titleLink="timeline3-1"
        description="여러개의 엘리먼트에 각각의 지연 시간을 다르게 적용"
        className="mt-4"
        onPlay={() => paliga3.play()}
      >
        <TestSection.Box ref={box3_0} />
        <TestSection.Box className="mt-2 bg-primary" ref={box3_1} />
        <TestSection.Box className="mt-2 bg-success" ref={box3_2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineTest3Props = {
  /** class */
  className?: string;
};

export default TimelineTest3;
