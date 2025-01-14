"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ReverseTest1 } from "../../features/methods/components/ReverseTest1";

/** ===== Components ===== */
function ReverseMethodPage() {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
    >
      <AccordionItem title="Reverse" key="0">
        <ReverseTest1 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */

export default ReverseMethodPage;
