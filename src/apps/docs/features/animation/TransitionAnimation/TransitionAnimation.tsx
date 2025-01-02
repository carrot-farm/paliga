"use client";
import { useRef } from "react";
import { TestSection } from "../../test/components/TestSection";
import { ANIMATION_CODES } from "../contants/animationCode";

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
  const box10 = useRef<HTMLDivElement>(null);
  const box11 = useRef<HTMLDivElement>(null);
  const box12 = useRef<HTMLDivElement>(null);
  const box13 = useRef<HTMLDivElement>(null);
  const box14 = useRef<HTMLDivElement>(null);
  const box15 = useRef<HTMLDivElement>(null);
  const box16 = useRef<HTMLDivElement>(null);

  return (
    <div className={"flex flex-col gap-y-4"}>
      <TestSection
        title="x, y, z"
        titleLink="animation-translate"
        description="x, y, z 좌표 이동"
        code={ANIMATION_CODES["animation-translate"]}
        onReady={({ paliga }) => {
          paliga.timeline([box1.current!, box2.current!, box9.current!], {
            each: (_, i) => ({
              x: i === 0 ? 200 : 0,
              y: i === 1 ? 30 : 0,
              z: i === 2 ? -400 : 0,
            }),
          });
        }}
        onPlay={({ paliga }) => {
          paliga?.play();
        }}
      >
        <div className="flex flex-col gap-y-2">
          <TestSection.Box ref={box1}>x: 200</TestSection.Box>
          <TestSection.Box ref={box2}>y: 30</TestSection.Box>
          <div className="inline-flex translate-x-9" style={{ perspective: "1200px" }}>
            <TestSection.Box className="h-14 w-14" ref={box9}>
              z: -400
            </TestSection.Box>
          </div>
        </div>
      </TestSection>

      <TestSection
        title="width, height"
        titleLink="animation-width-height"
        description="넓이, 놃이"
        onReady={({ paliga }) => {
          paliga.timeline([box13.current!, box14.current!], {
            direction: "reverse",
            each: (_, i) => ({
              width: i === 0 ? 80 : undefined,
              height: i === 1 ? 80 : undefined,
            }),
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <div className="flex flex-col gap-y-10">
          <TestSection.Box className="h-10 w-10" ref={box13}>
            width: 80px
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box14}>
            height: 80px
          </TestSection.Box>
        </div>
      </TestSection>

      <TestSection
        title="border"
        titleLink="animation-border"
        description="테두리 굵기, 색상"
        onReady={({ paliga }) => {
          paliga.timeline([box15.current!, box16.current!], {
            direction: "reverse",
            borderWidth: 3,
            each: (_, i) => ({
              borderColor: i === 1 ? "#262df1" : undefined,
            }),
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <div className="flex flex-col gap-y-10">
          <TestSection.Box className="h-10 w-10" ref={box15}>
            borderWidth: 4px
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box16}>
            borderColor: #262df1
          </TestSection.Box>
        </div>
      </TestSection>

      <TestSection
        title="scale"
        titleLink="animation-scale"
        description="스케일 x, y, z(scle: x, y 둘다 적용)"
        onReady={({ paliga }) => {
          paliga.timeline([box4.current!, box10.current!, box11.current!, box12.current!], {
            each: (_, i) => ({
              scale: i === 0 ? 0.7 : undefined,
              scaleX: i === 1 ? 0.7 : undefined,
              scaleY: i === 2 ? 0.7 : undefined,
              scaleZ: i === 3 ? 0.7 : undefined,
            }),
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <div className="flex flex-col gap-y-10">
          <TestSection.Box className="h-10 w-10" ref={box4}>
            scale: 0.7
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box10}>
            scaleX:0.7
          </TestSection.Box>
          <TestSection.Box className="h-10 w-10" ref={box11}>
            scaleY:0.7
          </TestSection.Box>
          <div
            className="inline-block"
            style={{ perspective: "1000px", perspectiveOrigin: "120% 120%" }}
          >
            <TestSection.Box className="h-10 w-10" ref={box12}>
              scaleZ:0.7
            </TestSection.Box>
          </div>
        </div>
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
