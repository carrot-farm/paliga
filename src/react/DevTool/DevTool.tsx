"use client";

import { MutableRefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Paliga } from "../../core/Paliga";
import ProgressSlider from "./ProgressSlider";

/** ===== Components ===== */
function DevTool({ paligaRef }: DevToolProps) {
  const [isReady, setIsReady] = useState(false);
  const controlType = paligaRef.current.getControlType();
  const key = JSON.stringify(isReady);
  // console.log("> ", paliga);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return createPortal(
    <div data-paliga-dev-tool="root">
      {controlType === "play" && <ProgressSlider key={key} paligaRef={paligaRef} />}
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
