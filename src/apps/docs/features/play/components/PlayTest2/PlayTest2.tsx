"use client";
import { cn } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePaliga } from "../../../../shared/hooks/usePaliga";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function PlayTest2({ className }: PlayTest2Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const { paliga } = usePaliga();

  useEffect(() => {
    if (box1.current) {
      paliga.animate([box1.current], {
        x: 200,
        duration: 1000,
        direction: "alternate",
      });
    }
  }, []);

  return (
    <div className={cn(className)}>
      <TestSection
        title="Pause()"
        titleLink="play2-0"
        description="실행중인 애니메이션을 중단"
        onPause={() => paliga.pause()}
        onPlay={() => paliga.play({ infinity: true })}
      >
        <TestSection.Box key={`play2-0`} ref={box1} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type PlayTest2Props = {
  /** class */
  className?: string;
};

export default PlayTest2;
