"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function PlayTest1({ className }: PlayTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga
        .timeline([box1.current], {
          x: 200,
          duration: 1000,
        })
        .play();
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        titleLink="play1-0"
        description="애니메이션 정의 시 호출할 경우 애니메이션을 즉시 실행할 수 있다."
        hideController
      >
        <TestSection.Box ref={box1} />
      </TestSection>

      <TestSection
        titleLink="play1-1"
        description="원하는 시점에 호출하기 위해서는 인스턴스의 play() 를 호출"
        className="mt-4"
        onReady={({ paliga }) => {
          if (box2.current) {
            paliga.timeline([box2.current], {
              x: 200,
            });
          }
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type PlayTest1Props = {
  /** class */
  className?: string;
};

export default PlayTest1;
