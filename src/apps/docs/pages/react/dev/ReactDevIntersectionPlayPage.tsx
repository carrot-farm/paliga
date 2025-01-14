"use client";

import { Timeline } from "../../../../../react";

/** ===== Components ===== */
function ReactDevIntersectionPlayPage({}: ReactDevIntersectionPlayPageProps) {
  return (
    <div>
      <div className="h-screen"></div>
      <Timeline
        className="h-10 w-10 rounded-md bg-warning"
        isDevTool
        isIntersectionPlay
        timeline={[{ x: 200 }, { x: 50 }, { x: -100 }]}
      />
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevIntersectionPlayPageProps = {};

export default ReactDevIntersectionPlayPage;
