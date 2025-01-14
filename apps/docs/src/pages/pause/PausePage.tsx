"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PauseTest1 } from "../../features/pause/components/PauseTest1";

/** ===== Components ===== */
function PausePage({}: Timelinerops) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
    >
      <AccordionItem title="애니메이션 중단" key="1">
        <PauseTest1 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Timelinerops = {};

export default PausePage;
