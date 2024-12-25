"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function IntersectionPlayTest2({ className }: IntersectionPlayTest2Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const box5 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();
  const { paliga: paliga2 } = usePaliga();
  const { paliga: paliga3 } = usePaliga();
  const { paliga: paliga4 } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga
        .animate([box1.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay({
          threshold: 1,
        });
    }

    if (box2.current && box3.current) {
      paliga2
        .animate([box2.current, box3.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay({
          eachOptions: ({}, i) => ({ threshold: i === 0 ? 0 : 1 }),
        });
    }

    if (box4.current) {
      paliga3
        .animate([box4.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay({
          onIntersecting: () => alert("intersecting"),
        });
    }

    if (box5.current) {
      paliga4
        .animate([box5.current], {
          x: 200,
          duration: 1000,
        })
        .intersectionPlay({
          onAnimationEnd: () => alert("done"),
        });
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="threshold: `number`"
        titleLink="intersection-play2-0"
        description="엘리먼트가 얼마나 노출되어야 하는지 실행이 되는지 지정.(0 ~ 1) 기본값은 0"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box className="h-[120px]" ref={box1} />
        <div className="h-[50px]"></div>
      </TestSection>

      <TestSection
        title="eachOptions"
        titleLink="intersection-play2-1"
        description="엘리먼트 별로 애니메이션을 지정"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box className="h-[120px]" ref={box2}>
          일부 노출 시 실행
        </TestSection.Box>
        <div className="h-[200px]"></div>
        <TestSection.Box className="h-[120px]" ref={box3}>
          전체 노출 시 실행
        </TestSection.Box>
        <div className="h-[50px]"></div>
      </TestSection>

      <TestSection
        title="onIntersecting"
        titleLink="intersection-play2-2"
        description="교차 시 호출"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box className="h-[120px]" ref={box4} />
        <div className="h-[50px]"></div>
      </TestSection>

      <TestSection
        title="onAnimationEnd"
        titleLink="intersection-play2-3"
        description="애니메이션 종료 시 호출"
        classNames={{
          container: "h-[140px] overflow-y-auto overflow-x-hidden",
        }}
      >
        <div className="h-[200px]"></div>
        <TestSection.Box className="h-[120px]" ref={box5} />
        <div className="h-[50px]"></div>
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type IntersectionPlayTest2Props = {
  /** class */
  className?: string;
};

export default IntersectionPlayTest2;
