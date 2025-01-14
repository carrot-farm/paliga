"use client";

import { useRef } from "react";
import { Timeline } from "../../../../../react";

/** ===== Components ===== */
function ReactDevScrollProgress2Page({}: ReactDevScrollProgress2PageProps) {
  const root = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="relative h-[400px] overflow-y-auto bg-gray-700" ref={root}>
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
            root,
          }}
        />

        <div style={{ height: "200vh" }}></div>
      </div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevScrollProgress2PageProps = {};

export default ReactDevScrollProgress2Page;
