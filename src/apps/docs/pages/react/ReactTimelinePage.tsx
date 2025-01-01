"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { TimelineProps } from "../../features/react/components/TimelineProps";

/** ===== Components ===== */
function ReactTimelinePage({}: ReactTimelinePageProps) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="Props" key="0">
        <TimelineProps />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactTimelinePageProps = {};

export default ReactTimelinePage;
