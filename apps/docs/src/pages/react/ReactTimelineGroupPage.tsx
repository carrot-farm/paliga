"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { TimelineGroupProps } from "../../features/react/components/TimelineGroupProps";

/** ===== Components ===== */
function ReactTimelineGroupPage({}: ReactTimelineGroupPageProps) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="Props" key="0">
        <TimelineGroupProps />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactTimelineGroupPageProps = {};

export default ReactTimelineGroupPage;
