"use client";

import { MutableRefObject } from "react";

/** ===== Components ===== */
function ScrollIndicator({
  trigger,
  start,
  end,
  root,
  triggerRef,
  startRef,
  endRef,
}: ScrollIndicatorProps) {
  // console.log("> ", x, width, right);

  return (
    <>
      {typeof trigger === "number" && (
        <div
          data-paliga-dev-tool="scroll-indicator__trigger"
          className={`${root ? "trigger__sticky" : ""}`}
          style={{ top: trigger }}
          ref={triggerRef}
        >
          <div data-paliga-dev-tool="scroll-indicator__indicator-container">
            <span data-paliga-dev-tool="scroll-indicator__text">Trigger</span>
            <div data-paliga-dev-tool="scroll-indicator__indicator"></div>
          </div>
        </div>
      )}

      {typeof start === "number" && (
        <div data-paliga-dev-tool="scroll-indicator__start" style={{ top: start }} ref={startRef}>
          <div data-paliga-dev-tool="scroll-indicator__indicator-container">
            <span data-paliga-dev-tool="scroll-indicator__text">Start</span>
            <div data-paliga-dev-tool="scroll-indicator__indicator"></div>
          </div>
        </div>
      )}

      {typeof end === "number" && (
        <div data-paliga-dev-tool="scroll-indicator__end" style={{ top: end }} ref={endRef}>
          <div data-paliga-dev-tool="scroll-indicator__indicator-container">
            <span data-paliga-dev-tool="scroll-indicator__text">End</span>
            <div data-paliga-dev-tool="scroll-indicator__indicator"></div>
          </div>
        </div>
      )}
    </>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ScrollIndicatorProps = {
  /** 트리거 */
  trigger?: number;
  /** 시작 */
  start?: number;
  /** 종료 */
  end?: number;
  /** 부모 엘리먼트 */
  root?: HTMLElement;
  /** trigger inidicator */
  triggerRef?: MutableRefObject<HTMLDivElement | null>;
  /** start inidicator */
  startRef?: MutableRefObject<HTMLDivElement | null>;
  /** end inidicator */
  endRef?: MutableRefObject<HTMLDivElement | null>;
};

export default ScrollIndicator;
