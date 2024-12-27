"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
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
  const [box1Y, setBox1Y] = useState<number>();

  useEffect(() => {
    if (box1.current && containerRef1.current && box2.current) {
      paliga
        .timeline([box1.current, box2.current], {
          x: 100,
          y: 80,
          duration: 1000,
        })
        .timeline({
          y: 100,
          x: 100,
          duration: 1000,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 400,
          root: containerRef1.current,
        });
    }
  }, []);

  useEffect(() => {
    if (!box1.current) {
      return;
    }
    const { y } = box1.current.getBoundingClientRect();
    setBox1Y(y);
  }, []);
  // console.log(">> ", box1Y);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        titleLink="scroll-progress1-0"
        description="스크롤에 따라 애니메이션의 진행"
        scrollTrigger={"20%"}
        scrollStart={0}
        scrollEnd={100}
        scrollTargetEl={box1.current}
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef1}
      >
        <div className="h-[120px]"></div>
        <TestSection.Box ref={box1} />
        <TestSection.Box className="mt-8" ref={box2} />
        <div className="h-[400px]"></div>
      </TestSection>

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
