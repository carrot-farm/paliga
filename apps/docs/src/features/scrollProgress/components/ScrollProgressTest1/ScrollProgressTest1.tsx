"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ScrollProgressTest1({ className }: ScrollProgressTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const [, setIsReady] = useState(false);

  useEffect(() => {
    if (box1.current && containerRef1.current && box2.current) {
      paliga
        .timeline([box1.current, box2.current], {
          x: 100,
          y: 80,
        })
        .timeline({
          y: 100,
          x: 100,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 400,
          root: containerRef1.current,
        });
    }

    setIsReady(true);
  }, []);

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
