"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

/** ===== Components ===== */
function ReactUsePaligaPage({}: ReactUsePaligaPageProps) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
      // defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="Props" key="0">
        test
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactUsePaligaPageProps = {};

export default ReactUsePaligaPage;