"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PlayTest1 } from "../../features/play/components/PlayTest1";
import { PlayTest2 } from "../../features/play/components/PlayTest2";
import { PlayTest3 } from "../../features/play/components/PlayTest3";

/** ===== Components ===== */
function PlayPage({}: Timelinerops) {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={Array.from({ length: 3 }, (_, i) => String(i))}
    >
      <AccordionItem title="애니메이션 실행" key="0">
        <PlayTest1 />
      </AccordionItem>

      <AccordionItem title="애니메이션 중단" key="1">
        <PlayTest2 />
      </AccordionItem>

      <AccordionItem title="옵션" key="2">
        <PlayTest3 />
      </AccordionItem>
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Timelinerops = {};

export default PlayPage;
