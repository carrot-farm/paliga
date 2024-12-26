"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ScrollProgressTest1({ className }: ScrollProgressTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box1.current && containerRef1.current) {
      paliga
        .animate([box1.current], {
          x: 200,
          duration: 1000,
        })
        .animate({
          y: -200,
          x: -200,
          duration: 100,
        })
        .scrollProgress({
          startY: 0,
          endY: 120,
          duration: 1000,
          // root: containerRef1.current,
        });
    }

    if (box2.current && box3.current) {
      paliga2
        .animate([box2.current, box3.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay();
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        titleLink="scroll-progress1-0"
        description="스크롤에 따라 애니메이션의 진행"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef1}
      >
        <div className="h-[200px]"></div>
        {/* <TestSection.Box ref={box1} /> */}
        <div className="h-[50px]"></div>
      </TestSection>

      <div className="h-[600px]"></div>
      <TestSection.Box ref={box1} />
      <div className="h-[800px]"></div>
      {/* 
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
      </TestSection> */}
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ScrollProgressTest1Props = {
  /** class */
  className?: string;
};

export default ScrollProgressTest1;
