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
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();
  const { paliga: paliga4 } = usePaliga();
  const { paliga: paliga5 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga.timeline([box1.current], {
        x: 200,
      });
    }

    if (box2.current) {
      paliga2.timeline([box2.current], {
        x: 200,
      });
    }

    if (box3.current) {
      paliga3
        .timeline([box3.current], {
          x: 200,
        })
        .timeline({
          y: 120,
        });
    }

    if (box4.current) {
      paliga4
        .timeline([box4.current], {
          x: 200,
        })
        .timeline({
          y: 120,
        });
    }

    if (box5.current) {
      paliga5.timeline([box5.current], {
        x: 200,
      });
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="iteration: number"
        titleLink="play3-0"
        description="지정된 횟수만큼 애니메이션 실행"
        onPause={() => paliga.pause()}
        onPlay={() => paliga.play({ iteration: 3 })}
      >
        <TestSection.Box ref={box1} />
      </TestSection>

      <TestSection
        titleLink="play3-1"
        description="무한 반복 하기 위해서는 `Infinity`를 지정"
        onPause={() => paliga2.pause()}
        onPlay={() => paliga2.play({ iteration: Infinity })}
      >
        <TestSection.Box ref={box2} />
      </TestSection>

      <TestSection
        title="startProgress: number"
        titleLink="play3-2"
        description="지정된 진행도부터 실행(0 ~ 1)"
        onPlay={() => paliga3.play({ startProgress: 0.3 })}
      >
        <TestSection.Box ref={box3}>0.3</TestSection.Box>
      </TestSection>

      <TestSection
        title="endProgress: number"
        titleLink="play3-3"
        description="지정된 진행도까지만 실행(0 ~ 1)"
        onPlay={() => paliga4.play({ endProgress: 0.7 })}
      >
        <TestSection.Box ref={box4}>0.7</TestSection.Box>
      </TestSection>

      <TestSection
        title="onAllAnimationEnd()"
        titleLink="play3-4"
        description="모든 애니메이션 종료 시 호출.(iteration: `Infinity` 인 경우는 호출되지 않음)"
        onPause={() => paliga5.pause()}
        onPlay={() => paliga5.play({ iteration: 2, onAllAnimationEnd: () => alert("done") })}
      >
        <TestSection.Box ref={box5} />
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
