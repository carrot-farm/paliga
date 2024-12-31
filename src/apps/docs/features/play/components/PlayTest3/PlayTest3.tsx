"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function PlayTest3({ className }: PlayTest3Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const box6 = useRef<HTMLDivElement>(null);
  const box7 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();
  const { paliga: paliga4 } = usePaliga();
  const { paliga: paliga5 } = usePaliga();
  const [isDone, setIsDone] = useState(false);

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
        onReady={({ paliga }) => box1.current && paliga.timeline([box1.current], { x: 200 })}
        onPlay={({ paliga }) => paliga?.play({ iteration: 3 })}
      >
        <TestSection.Box ref={box1}>3</TestSection.Box>
      </TestSection>

      <TestSection
        titleLink="play3-1"
        description="무한 반복 하기 위해서는 `Infinity`를 지정"
        onReady={({ paliga }) => box2.current && paliga.timeline([box2.current], { x: 200 })}
        onPlay={({ paliga }) => paliga?.play({ iteration: Infinity })}
      >
        <TestSection.Box ref={box2}>{"Infinity"}</TestSection.Box>
      </TestSection>

      <TestSection
        title="startProgress: number"
        titleLink="play3-2"
        description="지정된 진행도부터 실행"
        onReady={({ paliga }) => box3.current && paliga.timeline([box3.current], { x: 200 })}
        onPlay={({ paliga }) => paliga?.play({ startProgress: 0.3 })}
      >
        <TestSection.Box ref={box3}>0.3</TestSection.Box>
      </TestSection>

      <TestSection
        title="endProgress: number"
        titleLink="play3-3"
        description="지정된 진행도까지만 실행(0 ~ 1)"
        onReady={({ paliga }) => box4.current && paliga.timeline([box4.current], { x: 200 })}
        onPlay={({ paliga }) => paliga?.play({ endProgress: 0.7 })}
      >
        <TestSection.Box ref={box4}>0.7</TestSection.Box>
      </TestSection>

      <TestSection
        title="fillMode: 'none' | 'forwards'"
        titleLink="play-fillMode-1"
        description="forwards(default) - 종료 후 위치에서 고정"
        onReady={({ paliga }) => {
          if (box6.current) {
            paliga.timeline([box6.current], { x: 200 });
          }
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box6}>forwards</TestSection.Box>
      </TestSection>

      <TestSection
        titleLink="play-fillMode-2"
        description="none - 종료 후 위치 초기화"
        onReady={({ paliga }) => {
          if (box7.current) {
            paliga.timeline([box7.current], { x: 200 });
          }
        }}
        onPlay={({ paliga }) => paliga?.play({ fillMode: "none" })}
      >
        <TestSection.Box ref={box7}>none</TestSection.Box>
      </TestSection>

      <TestSection
        title="onAllAnimationEnd()"
        titleLink="play3-4"
        description="모든 애니메이션 종료 시 호출.(iteration: `Infinity` 인 경우는 호출되지 않음)"
        onReady={({ paliga }) => box5.current && paliga.timeline([box5.current], { x: 200 })}
        onPause={({ paliga }) => paliga?.pause()}
        onPlay={({ paliga }) => {
          setIsDone(false);
          paliga?.play({ iteration: 2, onAllAnimationEnd: () => setIsDone(true) });
        }}
      >
        <TestSection.Box ref={box5}>{isDone && "done !"}</TestSection.Box>
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
