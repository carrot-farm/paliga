"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
/** x 축 이동에 대한 테스트 */
function TimelineTest3({ className }: TimelineTest3Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3_0 = useRef<HTMLDivElement>(null);
  const box3_1 = useRef<HTMLDivElement>(null);
  const box3_2 = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(className)}>
      <TestSection
        title="delay: `number`"
        titleLink="timeline3-0"
        description="애니메이션의 시작 시간을 지연"
        onReady={({ paliga }) => {
          paliga
            .timeline([box1.current!], {
              x: 200,
            })
            .timeline([box2.current!], {
              x: 200,
              delay: 1000,
            });
        }}
        onPlay={({ paliga }) => {
          paliga?.play();
        }}
      >
        <TestSection.Box ref={box1} />
        <TestSection.Box className="mt-2" ref={box2}>
          1000ms
        </TestSection.Box>
      </TestSection>

      <TestSection
        title="each"
        titleLink="timeline3-1"
        description="여러개의 엘리먼트에 각각의 지연 시간을 다르게 적용"
        className="mt-4"
        onReady={({ paliga }) => {
          paliga.timeline([box3_0.current!, box3_1.current!, box3_2.current!], {
            x: 200,
            duration: 1000,
            each: (_, i) => ({ delay: i * 200 }),
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box3_0}>0</TestSection.Box>
        <TestSection.Box className="mt-2" ref={box3_1}>
          200ms
        </TestSection.Box>
        <TestSection.Box className="mt-2" ref={box3_2}>
          400ms
        </TestSection.Box>
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
