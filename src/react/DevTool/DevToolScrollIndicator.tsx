"use client";
import { getScrollTriggerY } from "../../helpers/scrollHelpers";
import { getDistanceFromTop } from "../../helpers/styleHelpers";
import { ScrollIndicator } from "../ScrollIndicator";
import { DevToolProps } from "./DevTool";

/** ===== Components ===== */
function DevToolScrollIndicator({ paligaRef }: DevToolScrollIndicatorProps) {
  const schedule = paligaRef.current.getSchedule();
  if (!schedule || schedule.length === 0) {
    return null;
  }
  const options = paligaRef.current.getScrollProgressOptions();
  const { startY, endY, root } = options;
  const rootY = root instanceof Element ? getDistanceFromTop(root) : 0;
  const firstEl = schedule[0].element;
  const firstElY = getDistanceFromTop(firstEl);
  const trigger = getScrollTriggerY({
    scrollTrigger: options.trigger ?? 0,
    containerEl: root,
  });
  const baseY = firstElY - rootY;
  const start = startY ? baseY + startY : baseY;
  const end = endY ? baseY + endY : baseY;

  return (
    <>
      <ScrollIndicator trigger={trigger} start={start} end={end} />
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolScrollIndicatorProps = {} & Pick<DevToolProps, "paligaRef">;

export default DevToolScrollIndicator;
