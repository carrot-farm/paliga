"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PlayTest1 } from "../../features/play/components/PlayTest1";
import { PlayTest2 } from "../../features/play/components/PlayTest2";

/** ===== Components ===== */
function PlayPage({}: Timelinerops) {
  return (
    <Accordion
      selectionMode="multiple"
      // defaultExpandedKeys={Array.from({ length: 7 }, (_, i) => String(i))}
      defaultExpandedKeys={["1"]}
    >
      <AccordionItem title="애니메이션 시작" key="0">
        <PlayTest1 />
      </AccordionItem>

      <AccordionItem title="애니메이션 중단" key="1">
        <PlayTest2 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Timelinerops = {};

export default PlayPage;
