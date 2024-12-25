"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { TimelineTest1 } from "../../features/timeline/components/TimelineTest1";
import { TimelineTest2 } from "../../features/timeline/components/TimelineTest2";
import { TimelineTest3 } from "../../features/timeline/components/TimelineTest3";
import { TimelineTest4 } from "../../features/timeline/components/TimelineTest4";
import { TimelineTest5 } from "../../features/timeline/components/TimelineTest5";
import { TimelineTest6 } from "../../features/timeline/components/TimelineTest6";
import { TimelineTest7 } from "../../features/timeline/components/TimelineTest7";

/** ===== Components ===== */
function TimelinePage({}: Timelinerops) {
  return (
    <>
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={Array.from({ length: 7 }, (_, i) => String(i + 1))}
      >
        <AccordionItem title="기본 사용법" key="1">
          <TimelineTest1 />
        </AccordionItem>

        <AccordionItem title="Easing" key="5">
          <TimelineTest5 />
        </AccordionItem>

        <AccordionItem title="진행 방향" key="2">
          <TimelineTest2 />
        </AccordionItem>

        <AccordionItem title="애니메이션 시작 지연" key="3">
          <TimelineTest3 />
        </AccordionItem>

        <AccordionItem title="애니메이션 반복" key="4">
          <TimelineTest4 />
        </AccordionItem>

        <AccordionItem title="엘리먼트별 애니메이션 적용" key="6">
          <TimelineTest6 />
        </AccordionItem>

        <AccordionItem title="프레임별 애니메이션 적용" key="7">
          <TimelineTest7 />
        </AccordionItem>
      </Accordion>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type Timelinerops = {};

export default TimelinePage;
