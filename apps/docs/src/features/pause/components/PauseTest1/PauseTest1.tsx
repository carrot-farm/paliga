"use client";
import { cn } from "@nextui-org/react";
import { useRef } from "react";
import { TestSection } from "../../../test/components/TestSection";

/** ===== Components ===== */
function PauseTest1({ className }: PauseTest1Props) {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <TestSection
        title="Pause()"
        titleLink="play2-0"
        description="실행중인 애니메이션을 중단"
        onReady={({ paliga }) =>
          box1.current &&
          paliga.timeline([box1.current], {
            x: 200,
            direction: "alternate",
          })
        }
        onPlay={({ paliga }) => paliga?.play({ iteration: Infinity })}
      >
        <TestSection.Box key={`play2-0`} ref={box1} />
      </TestSection>

      <TestSection
        title="Resume()"
        titleLink="play2-1"
        description="중단 시킨 애니메이션을 재개"
        onReady={({ paliga }) =>
          box2.current &&
          paliga
            .timeline([box2.current], {
              x: 200,
              direction: "alternate",
            })
            .play({ iteration: Infinity })
        }
        onPlay={({ paliga }) => {
          paliga?.resume();
        }}
      >
        <TestSection.Box key={`play2-0`} ref={box2} />
      </TestSection>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type PauseTest1Props = {
  /** class */
  className?: string;
};

export default PauseTest1;
