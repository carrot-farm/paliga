"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function PlayTest3({ className }: PlayTest3Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga.timeline([box1.current], {
        x: 200,
        duration: 1000,
      });
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        x: 200,
        duration: 1000,
      });
    }

    if (box3.current) {
      paliga3.timeline([box3.current], {
        x: 200,
        duration: 1000,
      });
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="iteration: `number`"
        titleLink="play3-0"
        description="지정된 횟수만큼 애니메이션 실행"
        onPause={() => paliga.pause()}
        onPlay={() => paliga.play({ iteration: 3 })}
      >
        <TestSection.Box key={`play2-0`} ref={box1} />
      </TestSection>

      <TestSection
        titleLink="play3-1"
        description="무한 반복 하기 위해서는 `Infinity`를 지정"
        onPause={() => paliga2.pause()}
        onPlay={() => paliga2.play({ iteration: Infinity })}
      >
        <TestSection.Box key={`play2-0`} ref={box2} />
      </TestSection>

      <TestSection
        title="onAllAnimationEnd()"
        titleLink="play3-2"
        description="모든 애니메이션 종료 시 호출.(iteration: `Infinity` 인 경우는 호출되지 않음)"
        onPause={() => paliga3.pause()}
        onPlay={() => paliga3.play({ iteration: 2, onAllAnimationEnd: () => alert("done") })}
      >
        <TestSection.Box key={`play2-0`} ref={box3} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type PlayTest3Props = {
  /** class */
  className?: string;
};

export default PlayTest3;
