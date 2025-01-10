"use client";
/** ===== Components ===== */
function ScrollIndicator({ trigger, start, end }: ScrollIndicatorProps) {
  return (
    <>
      {typeof trigger === "number" && (
        <div data-paliga-dev-tool="scroll-indicator__trigger" style={{ top: trigger }}>
          <div data-paliga-dev-tool="scroll-indicator__indicator-container">
            <span data-paliga-dev-tool="scroll-indicator__text">Trigger</span>
            <div data-paliga-dev-tool="scroll-indicator__indicator"></div>
          </div>
        </div>
      )}

      {typeof start === "number" && (
        <div data-paliga-dev-tool="scroll-indicator__start" style={{ top: start }}>
          <div data-paliga-dev-tool="scroll-indicator__indicator-container">
            <span data-paliga-dev-tool="scroll-indicator__text">Start</span>
            <div data-paliga-dev-tool="scroll-indicator__indicator"></div>
          </div>
        </div>
      )}

      {typeof end === "number" && (
        <div data-paliga-dev-tool="scroll-indicator__end" style={{ top: end }}>
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
};

export default ScrollIndicator;
