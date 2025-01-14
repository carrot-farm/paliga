"use client";

import { TimelineGroup } from "../../../../../react";

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
        <TimelineGroup.Item className="h-10 w-10 rounded-md bg-warning" />
        <TimelineGroup.Item className="h-10 w-10 rounded-md bg-warning" />
        <TimelineGroup.Item className="h-10 w-10 rounded-md bg-warning" />
      </TimelineGroup>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevTimelineGroupPageProps = {};

export default ReactDevTimelineGroupPage;
