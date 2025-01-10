"use client";
import { ScrollIndicator } from "../ScrollIndicator";
import { DevToolProps } from "./DevTool";

/** ===== Components ===== */
function DevToolScrollIndicator({ paligaRef }: DevToolScrollIndicatorProps) {
  const schedule = paligaRef.current.getSchedule();
  if (!schedule || schedule.length === 0) {
    return null;
  }
  const { root } = paligaRef.current.getScrollProgressOptions();
  const { triggerY, startY, endY } = paligaRef.current.geTScrollProgressData();
  // const newStartY = baseY + start;
  // const end = baseY + end;

  console.log("> ", triggerY);

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
