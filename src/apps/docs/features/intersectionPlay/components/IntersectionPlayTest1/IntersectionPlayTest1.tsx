"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function IntersectionPlayTest1({ className }: IntersectionPlayTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga
        .timeline([box1.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay({
          threshold: 1,
        });
    }

    if (box2.current && box3.current) {
      paliga2
        .timeline([box2.current, box3.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay();
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        titleLink="intersection-play1-0"
        description="스크롤이 교차 시 지정된 애니메이션 실행"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box ref={box1} />
        <div className="h-[50px]"></div>
      </TestSection>

      <TestSection
        titleLink="intersection-play1-1"
        description="각각의 엘리먼트별 지정 가능"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box ref={box2} />

        <div className="h-[200px]"></div>
        <TestSection.Box ref={box3} />

        <div className="h-[50px]"></div>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type IntersectionPlayTest1Props = {
  /** class */
  className?: string;
};

export default IntersectionPlayTest1;
