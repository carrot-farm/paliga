"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ScrollProgressTest1 } from "../../features/scrollProgress/components/ScrollProgressTest1";

/** ===== Components ===== */
function ScrollProgressPage({}: Props) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="기본 사용법" key="0">
        <ScrollProgressTest1 />
      </AccordionItem>

      <AccordionItem title="옵션" key="1">
        {/* <IntersectionPlayTest2 /> */}
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Props = {};

export default ScrollProgressPage;
