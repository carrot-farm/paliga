"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function ScrollProgressTest2({ className }: ScrollProgressTest2Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const box6 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);
  const containerRef4 = useRef<HTMLDivElement>(null);
  const containerRef5 = useRef<HTMLDivElement>(null);
  const containerRef6 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();
  const { paliga: paliga4 } = usePaliga();
  const { paliga: paliga5 } = usePaliga();
  const { paliga: paliga6 } = usePaliga();
  const [, setIsReady] = useState(false);

  useEffect(() => {
    if (box1.current && containerRef1.current) {
      paliga
        .timeline([box1.current], {
          x: 200,
          y: 200,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 1,
          endY: 100,
          duration: 400,
          root: containerRef1.current,
        });
    }

    if (box2.current && containerRef2.current) {
      paliga2
        .timeline([box2.current], {
          x: 200,
          y: 200,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 2,
          endY: 100,
          duration: 400,
          root: containerRef2.current,
        });
    }

    if (box3.current && containerRef3.current) {
      paliga3
        .timeline([box3.current], {
          x: 200,
          y: 200,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 400,
          root: containerRef3.current,
        });
    }

    if (box4.current && containerRef4.current) {
      paliga4
        .timeline([box4.current], {
          x: 200,
          y: 200,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 400,
          root: containerRef4.current,
        });
    }

    if (box5.current && containerRef5.current) {
      paliga5
        .timeline([box5.current], {
          x: 200,
          y: 200,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 2000,
          root: containerRef5.current,
        });
    }

    if (box6.current && containerRef6.current) {
      paliga6
        .timeline([box6.current], {
          x: 200,
          rotate: 360,
          scale: 2,
        })
        .scrollProgress({
          trigger: "20%",
          startY: 0,
          endY: 100,
          duration: 800,
          pin: true,
          root: containerRef6.current,
        });
    }

    setIsReady(true);
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="trigger: number | string"
        titleLink="scroll-progress1-0"
        description="애니메이션의 구간의 교차 기준 지점"
        scrollTrigger={"20%"}
        scrollStart={undefined}
        scrollEnd={undefined}
        scrollTargetEl={box1.current}
        hideController
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef1}
      >
        <div className="h-[120px]"></div>
        <TestSection.Box ref={box1} />
        <div className="h-[400px]"></div>
      </TestSection>

      <TestSection
        title="startY: number"
        titleLink="scroll-progress1-2"
        description="애니메이션의 구간의 시작점.(`root`를 기준)"
        scrollTrigger={"20%"}
        scrollStart={0}
        scrollEnd={undefined}
        scrollTargetEl={box2.current}
        hideController
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef2}
      >
        <div className="h-[120px]"></div>
        <TestSection.Box ref={box2} />
        <div className="h-[400px]"></div>
      </TestSection>

      <TestSection
        title="endY: number"
        titleLink="scroll-progress1-3"
        description="애니메이션의 구간의 종료점.(`root`를 기준)"
        scrollTrigger={"20%"}
        scrollStart={0}
        scrollEnd={100}
        scrollTargetEl={box3.current}
        hideController
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef3}
      >
        <div className="h-[120px]"></div>
        <TestSection.Box ref={box3} />
        <div className="h-[400px]"></div>
      </TestSection>

      <TestSection
        title="duration: number"
        titleLink="scroll-progress1-4"
        description="애니메이션의 실행 시간(ms)"
        scrollTrigger={"20%"}
        scrollStart={0}
        scrollEnd={100}
        scrollTargetEl={box5.current}
        hideController
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef5}
      >
        <div className="h-[120px]"></div>
        <TestSection.Box ref={box5} />
        <div className="h-[400px]"></div>
      </TestSection>

      <TestSection
        title="pin"
        titleLink="scroll-progress1-5"
        description="구간동안 엘리먼트를 고정"
        scrollTrigger={"20%"}
        scrollStart={0}
        scrollEnd={100}
        scrollTargetEl={box6.current}
        hideController
        classNames={{
          container: "h-[240px] overflow-y-auto overflow-x-hidden",
        }}
        containerRef={containerRef6}
      >
        <div className="h-[100px]"></div>
        <TestSection.Box ref={box6} />
        <div className="h-[400px]"></div>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ScrollProgressTest2Props = {
  /** class */
  className?: string;
};

export default ScrollProgressTest2;
