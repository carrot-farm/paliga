"use client";

import { Timeline } from "../../../../../react";

/** ===== Components ===== */
function ReactDevScrollProgress1Page({}: ReactDevScrollProgress1PageProps) {
  return (
    <div style={{ minHeight: "calc(70vh - 104px)" }}>
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
        }}
      />

      <div style={{ height: "200vh" }}></div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDevScrollProgress1PageProps = {};

export default ReactDevScrollProgress1Page;
