"use client";
import { useRef } from "react";
import { TestSection } from "../../test/components/TestSection";

/** ===== Components ===== */
function TransitionAnimation({}: TransitionAnimationProps) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const box6 = useRef<HTMLDivElement>(null);
  const box7 = useRef<HTMLDivElement>(null);
  const box8 = useRef<HTMLDivElement>(null);
  const box9 = useRef<HTMLDivElement>(null);

  return (
    <div className={"flex flex-col gap-y-4"}>
      <TestSection
        title="x: number"
        titleLink="animation-transition-0"
        description="x 좌표 이동"
        onReady={({ paliga }) => {
          paliga.timeline([box1.current!], {
            x: 200,
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box1} />
      </TestSection>

      <TestSection
        title="y: number"
        titleLink="animation-transition-0"
        description="y 좌표 이동"
        onReady={({ paliga }) => {
          paliga.timeline([box2.current!], {
            y: 50,
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box2} />
      </TestSection>

      <TestSection
        title="z: number"
        titleLink="animation-transition-0"
        description="z 좌표 이동. (wrapper에 perspective 속성 필요)"
        onReady={({ paliga }) => {
          paliga.timeline([box9.current!], {
            z: -400,
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <div className="inline-flex" style={{ perspective: "1000px" }}>
          <TestSection.Box className="h-14 w-14" ref={box9} />
        </div>
      </TestSection>

      <TestSection
        title="opacity: number"
        titleLink="animation-transition-0"
        description="투명도"
        onReady={({ paliga }) => {
          paliga.timeline([box3.current!], {
            opacity: 0,
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box ref={box3} />
      </TestSection>

      <TestSection
        title="scale: [number, ?number, ?number]"
        titleLink="animation-transition-0"
        description="스케일"
        onReady={({ paliga }) => {
          paliga.timeline([box4.current!], {
            scale: [0.1, 0.1],
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box className="h-20 w-20" ref={box4} />
      </TestSection>

      <TestSection
        title="rotate"
        titleLink="animation-rotate-0"
        description="축 회전. `rotate`는 `rotateZ` 의 별칭"
        onReady={({ paliga }) => {
          paliga
            .timeline([box5.current!], {
              rotateX: 45,
            })
            .timeline([box6.current!], { rotateY: 45 })
            .timeline([box7.current!], { rotateZ: 45 });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <div className="flex h-[280px] flex-col justify-around">
          <TestSection.Box className="h-10 w-10" ref={box5}>
            rotateX: 45
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box6}>
            rotateY: 45
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box7}>
            rotateZ: 45
          </TestSection.Box>
        </div>
      </TestSection>

      <TestSection
        title="backgroundColor: string"
        titleLink="animation-backgroundColor-0"
        description="색상 타입이 hex, rgb, rgba 일 경우 배경색 변경(다른 색상 타입 미지원)"
        onReady={({ paliga }) => {
          paliga.timeline([box8.current!], {
            backgroundColor: "#8214b880",
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box className="h-10 w-10 bg-warning" ref={box8}></TestSection.Box>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TransitionAnimationProps = {};

export default TransitionAnimation;
