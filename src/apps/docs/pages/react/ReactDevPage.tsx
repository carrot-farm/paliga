"use client";
import { Timeline } from "../../../../react";
import { usePaliga } from "../../../../react/hooks/usePaliga";

/** ===== Components  ===== */
function ReactDevPage({}: ReactDeugrops) {
  const { paliga } = usePaliga();

  return (
    <div>
      <div style={{ height: "calc(70vh - 104px)" }}></div>
      <Timeline
        className="h-10 w-10 rounded-md bg-warning"
        isDevTool
        isScrollProgress
        timeline={[{ x: 200 }, { y: 200 }, { x: -100 }]}
        scrollProgressOptions={{
          trigger: "50%",
          startY: 0,
          endY: 400,
          duration: 1000,
        }}
        paligaRef={paliga}
      />
      <div style={{ height: "100vh" }}></div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDeugrops = {};

export default ReactDevPage;
