"use client";
import { useEffect, useRef, useState } from "react";
import { Timeline } from "../../../../../../react";
import { usePaliga } from "../../../../../../react/hooks/usePaliga";
import { TimelineHTMLRef } from "../../../../../../types";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function TimelineProps({}: TimelinePropsProps) {
  const box1Ref = useRef<TimelineHTMLRef<"div">>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <TestSection
        title="timeline"
        titleLink="react-timeline-props-0"
        description="애니메이션 타임라인 정의"
        disableInitialized
        paligaRef={paliga}
        onPlay={() => paliga.current.play()}
      >
        <Timeline
          className="inline-flex items-center gap-x-1"
          paligaRef={paliga}
          timeline={[{ x: 200 }, { y: 50, duration: 3000 }]}
        >
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]">x:200 -&gt; y:50</span>
        </Timeline>
      </TestSection>

      <TestSection
        title="progress"
        titleLink="react-props-progress-0"
        description="지정된 진행도까지 애니메이션 실행"
        defaultProgress={0.3}
        disableInitialized
        paligaRef={paliga2}
        onPlay={() => paliga2.current.resume()}
      >
        <Timeline
          className="inline-flex items-center gap-x-1"
          progress={0.3}
          paligaRef={paliga2}
          timeline={[{ x: 200 }]}
        >
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]">0.3</span>
        </Timeline>
      </TestSection>

      <TestSection
        title="isAutoPlay"
        titleLink="react-timeline-props-1"
        description="`true`일 경우 즉시 실행"
        hideController
      >
        <Timeline className="inline-flex items-center gap-x-1" isAutoPlay timeline={[{ x: 200 }]}>
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]">x:200</span>
        </Timeline>
      </TestSection>

      <TestSection
        title="autoPlayOptions"
        titleLink="react-timeline-props-1"
        description="즉시 실행 시 옵션"
        hideController
      >
        <Timeline
          className="inline-flex items-center gap-x-1"
          isAutoPlay
          autoPlayOptions={{
            iteration: 2,
          }}
          timeline={[{ x: 200 }]}
        >
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]">iteration: 2</span>
        </Timeline>
      </TestSection>

      <TestSection
        title="intersectionPlay"
        titleLink="react-props-intersectionPlay-0"
        description="스크롤이 지정된 위치에 도달 시 플레이"
        hideController
        classNames={{ container: "max-h-[320px] overflow-y-auto" }}
      >
        <div className="h-[380px]"> </div>
        <Timeline
          className="inline-flex items-center gap-x-1"
          isIntersectionPlay
          intersectionPlayOptions={{
            threshold: 1,
          }}
          timeline={[{ x: 200 }]}
        >
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]"></span>
        </Timeline>
        <div className="h-[100px]"> </div>
      </TestSection>

      <TestSection
        title="scrollProgress"
        titleLink="react-props-scrollProgress-0"
        description="스크롤의 위치에 따라 애니메이션의 진행 변화"
        scrollTrigger={"20%"}
        scrollStart={-100}
        scrollEnd={80}
        hideController
        classNames={{ container: "max-h-[320px] overflow-y-auto" }}
        scrollTargetEl={box1Ref.current}
        containerRef={containerRef}
      >
        <div className="h-[200px]"> </div>
        <Timeline
          className="inline-flex items-center gap-x-1"
          isScrollProgress={isReady}
          scrollProgressOptions={
            isReady
              ? {
                  trigger: "20%",
                  startY: -100,
                  endY: 80,
                  duration: 400,
                  root: containerRef.current as HTMLElement,
                }
              : undefined
          }
          timeline={[{ x: 200 }]}
          ref={box1Ref}
        >
          <div className="h-10 w-10 rounded-md bg-warning"></div>
          <span className="text-[0.65rem]"></span>
        </Timeline>
        <div className="h-[250px]"> </div>
      </TestSection>

      <button onClick={() => setCount(count + 1)}> {count}</button>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelinePropsProps = {};

export default TimelineProps;
