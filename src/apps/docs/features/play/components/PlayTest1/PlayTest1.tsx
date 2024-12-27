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
  const { paliga: paliga2 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga
        .timeline([box1.current], {
          x: 200,
          duration: 1000,
        })
        .play();
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="즉시 실행"
        titleLink="play1-0"
        description="애니메이션 정의 시 호출할 경우 애니메이션을 즉시 실행할 수 있다."
      >
        <TestSection.Box key={`timeline7-0`} ref={box1} />
      </TestSection>

      <TestSection
        title="원하는 시점에 실행"
        titleLink="play1-1"
        description="원하는 시점에 호출하기 위해서는 인스턴스의 play() 를 호출"
        className="mt-4"
        onPlay={() => paliga2.play()}
      >
        <TestSection.Box key={`timeline7-0`} ref={box2} />
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
