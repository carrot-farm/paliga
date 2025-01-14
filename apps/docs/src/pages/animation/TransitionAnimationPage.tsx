"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { TransitionAnimation } from "../../features/animation/TransitionAnimation";

/** ===== Components ===== */
function TransitionAnimationPage({}: TransitionAnimationPageProps) {
  return (
    <>
      <Accordion selectionMode="multiple" showDivider={false} defaultExpandedKeys={["1"]}>
        <AccordionItem title="Transition" key="1">
          <TransitionAnimation />
        </AccordionItem>
      </Accordion>
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type TransitionAnimationPageProps = {};

export default TransitionAnimationPage;
