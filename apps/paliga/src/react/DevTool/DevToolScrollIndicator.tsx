"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollIndicator } from "../ScrollIndicator";
import { DevToolProps } from "./DevTool";

/** ===== Components ===== */
function DevToolScrollIndicator({ paligaRef }: DevToolScrollIndicatorProps) {
  const schedule = paligaRef.current.getSchedule();
  if (!schedule || schedule.length === 0) {
    return null;
  }
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const { root } = paligaRef.current.getScrollProgressOptions();
  const { triggerY, startY, endY } = paligaRef.current.geTScrollProgressData();
  const [, setIsReady] = useState(false);
  // const newStartY = baseY + start;
  // const end = baseY + end;

  useEffect(() => {
    // console.log("> ", triggerRef.current, startRef.current, endRef.current);
    if (!root || !triggerRef.current || !startRef.current || !endRef.current) {
      return;
    }

    root.prepend(triggerRef.current);
    root.prepend(startRef.current);
    root.prepend(endRef.current);

    return () => {
      if (!root || !triggerRef.current || !startRef.current || !endRef.current) {
        return;
      }
      root.removeChild(triggerRef.current);
      root.removeChild(startRef.current);
      root.removeChild(endRef.current);
    };
  }, [root]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (root) {
    return createPortal(
      <ScrollIndicator
        trigger={triggerY}
        start={startY}
        end={endY}
        root={root}
        triggerRef={triggerRef}
        startRef={startRef}
        endRef={endRef}
      />,
      root,
    );
  }

  return (
    <>
      <ScrollIndicator trigger={triggerY} start={startY} end={endY} />
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolScrollIndicatorProps = {} & Pick<DevToolProps, "paligaRef">;

export default DevToolScrollIndicator;
