"use client";

import { Timeline } from "../../../../../paliga/src/react";

/** ===== Components ===== */
function ReactDevPlayPage({}: ReactDevPlayPageProps) {
  return (
    <div>
      <Timeline
        className="h-10 w-10 rounded-md bg-warning"
        isDevTool
        timeline={[{ x: 200 }, { x: 50 }, { x: -100 }]}
      />
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevPlayPageProps = {};

export default ReactDevPlayPage;
