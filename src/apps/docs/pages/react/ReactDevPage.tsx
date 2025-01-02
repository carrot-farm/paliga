"use client";
import { Timeline } from "../../../../react";
import { usePaliga } from "../../../../react/hooks/usePaliga";

/** ===== Components ===== */
function ReactDevPage({}: ReactDeugrops) {
  const { paliga } = usePaliga();

  return (
    <div>
      <Timeline
        className="h-10 w-10 rounded-md bg-warning"
        isDevTool
        paligaRef={paliga}
        timeline={[{ x: 200 }, { y: 200, duration: 500 }, { x: -100, duration: 500 }]}
      />
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDeugrops = {};

export default ReactDevPage;
