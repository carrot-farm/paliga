"use client";

import { MutableRefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Paliga } from "../../core/Paliga";
import DevToolScrollIndicator from "./DevToolScrollIndicator";
import ProgressSlider from "./ProgressSlider";

/** ===== Components ===== */
function DevTool({ paligaRef }: DevToolProps) {
  const [isReady, setIsReady] = useState(false);
  const controlType = paligaRef.current.getControlType();
  const key = JSON.stringify(isReady);
  // console.log("> cc: ", controlType, paligaRef);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return createPortal(
    <div data-paliga-dev-tool="root">
      {/* 진행도 */}
      {(controlType === "play" || controlType === "intersectionPlay") && (
        <ProgressSlider key={key} paligaRef={paligaRef} />
      )}

      {/* 스크롤 표시자 */}
      {controlType === "scrollProgress" && (
        <DevToolScrollIndicator key={key} paligaRef={paligaRef} />
      )}
    </div>,
    document.body,
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolProps = {
  /** 인스턴스 */
  paligaRef: MutableRefObject<Paliga>;
};

export default DevTool;
