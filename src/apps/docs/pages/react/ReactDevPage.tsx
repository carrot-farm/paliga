"use client";
import { Timeline } from "../../../../react";
import { usePaliga } from "../../../../react/hooks/usePaliga";

/** ===== Components  ===== */
function ReactDevPage({}: ReactDeugrops) {
  // const root = useRef<HTMLDivElement | null>(null);
  const { paliga } = usePaliga();

  return (
    <div>
      <div style={{ height: "calc(70vh - 104px)" }}>
        {/* <div className="relative h-[400px] overflow-y-auto bg-gray-700" ref={root}> */}
        <div className="h-[500px]"></div>
        <Timeline
          className="h-10 w-10 rounded-md bg-warning"
          isDevTool
          isScrollProgress
          timeline={[{ x: 200 }, { x: 50 }, { x: -100 }]}
          scrollProgressOptions={{
            trigger: "20%",
            startY: 0,
            endY: 200,
            duration: 1000,
            pin: true,
            // root,
          }}
          paligaRef={paliga}
        />

        <div style={{ height: "200vh" }}></div>
      </div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDeugrops = {};

export default ReactDevPage;
