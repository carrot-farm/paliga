"use client";
import { TimelineGroup, usePaliga } from "@paliga/core/react";
import { TimelineHTMLRef } from "@paliga/core/types.d.ts";
import { useEffect, useRef, useState } from "react";
import { TestSection } from "../../../test/components/TestSection";
import { REACT_CODES } from "../../constants/codes";

/** ===== Components ===== */
function TimelineGroupProps({}: TimelineGroupPropsProps) {
  const box1Ref = useRef<TimelineHTMLRef<"div">>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <TestSection
        title="timeline"
        titleLink="react-timeline-props-0"
        description="애니메이션 타임라인 정의"
        code={REACT_CODES["timelineProps"]}
        disableInitialized
        paligaRef={paliga}
        onPlay={() => paliga.current.play()}
      >
        <TimelineGroup paligaRef={paliga} timeline={[{ x: 200 }, { y: 70 }]}>
          <div className="box-1 flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:200 -&gt; y:50</span>
            </TimelineGroup.Item>

            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:200 -&gt; y:50</span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>
      </TestSection>

      <TestSection
        title="progress"
        titleLink="react-props-progress-0"
        description="지정된 진행도까지 애니메이션 실행"
        code={REACT_CODES["progress"]}
        defaultProgress={0.3}
        disableInitialized
        paligaRef={paliga2}
        onPlay={() => paliga2.current.resume()}
      >
        <TimelineGroup
          progress={0.3}
          paligaRef={paliga2}
          timeline={[{ each: (_, i) => ({ x: i === 0 ? 180 : 200 }) }]}
        >
          <div className="box-1 flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:180 / 0.3</span>
            </TimelineGroup.Item>

            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:200 / 0.3</span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>
      </TestSection>

      <TestSection
        title="isAutoPlay"
        titleLink="react-timeline-props-1"
        description="`true`일 경우 즉시 실행"
        code={REACT_CODES["isAutoPlay"]}
        hideController
      >
        <TimelineGroup isAutoPlay timeline={[{ x: 200 }]}>
          <div className="box-1 flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:200</span>
            </TimelineGroup.Item>

            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">x:200</span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>
      </TestSection>

      <TestSection
        title="autoPlayOptions"
        titleLink="react-timeline-props-1"
        description="즉시 실행 시 옵션"
        code={REACT_CODES["autoPlayOptions"]}
        hideController
      >
        <TimelineGroup isAutoPlay autoPlayOptions={{ iteration: 2 }} timeline={[{ x: 200 }]}>
          <div className="box-1 flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">iteration: 2</span>
            </TimelineGroup.Item>

            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]">iteration: 2</span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>
      </TestSection>

      <TestSection
        title="intersectionPlay"
        titleLink="react-props-intersectionPlay-0"
        description="스크롤이 지정된 위치에 도달 시 플레이"
        code={REACT_CODES["intersectionPlay"]}
        classNames={{ container: "max-h-[320px] overflow-y-auto" }}
        hideController
      >
        <div className="h-[380px]"> </div>
        <TimelineGroup
          isIntersectionPlay
          intersectionPlayOptions={{ threshold: 1 }}
          timeline={[{ x: 200 }]}
        >
          <div className="box-1 test flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]"></span>
            </TimelineGroup.Item>

            <TimelineGroup.Item className="mt-[80px] inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]"></span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>

        <div className="h-[100px]"> </div>
      </TestSection>

      <TestSection
        title="scrollProgress"
        titleLink="react-props-scrollProgress-0"
        description="스크롤의 위치에 따라 애니메이션의 진행 변화"
        code={REACT_CODES["scrollProgress"]}
        classNames={{ container: "max-h-[320px] overflow-y-auto" }}
        scrollTrigger={"20%"}
        scrollStart={-100}
        scrollEnd={80}
        hideController
        scrollTargetEl={box1Ref.current}
        containerRef={containerRef}
      >
        <div className="h-[200px]"> </div>
        <TimelineGroup
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
        >
          <div className="box-1 flex flex-col gap-y-2">
            <TimelineGroup.Item className="inline-flex items-center gap-x-1" ref={box1Ref}>
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]"></span>
            </TimelineGroup.Item>
            <TimelineGroup.Item className="mt-[80px] inline-flex items-center gap-x-1">
              <div className="bg-warning h-5 w-5 rounded-md"></div>
              <span className="text-[0.65rem]"></span>
            </TimelineGroup.Item>
          </div>
        </TimelineGroup>
        <div className="h-[250px]"> </div>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineGroupPropsProps = {};

export default TimelineGroupProps;
