"use client";

import { TimelineGroup } from "../../../../../paliga/src/react";

/** ===== Components ===== */
function ReactDevTimelineGroupPage({}: ReactDevTimelineGroupPageProps) {
  return (
    <div>
      <TimelineGroup
        isDevTool
        timeline={[
          {
            x: 200,
            each: (_, i) => ({ delay: i * 200 }),
            beforeStyle: (i) => ({ marginTop: i > 0 ? "20px" : undefined }),
          },
          { x: 50 },
          { x: -100 },
        ]}
      >
        <TimelineGroup.Item className="bg-warning h-10 w-10 rounded-md" />
        <TimelineGroup.Item className="bg-warning h-10 w-10 rounded-md" />
        <TimelineGroup.Item className="bg-warning h-10 w-10 rounded-md" />
      </TimelineGroup>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevTimelineGroupPageProps = {};

export default ReactDevTimelineGroupPage;
