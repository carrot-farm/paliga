"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Paliga } from "../../core/Paliga";
import DevToolOptionsPanel from "./DevToolOptionsPanel";
import DevToolScrollIndicator from "./DevToolScrollIndicator";
import GearIcon from "./GearIcon";
import ProgressSlider from "./ProgressSlider";

/** ===== Components ===== */
function DevTool({ paligaRef }: DevToolProps) {
  const optionsPanelRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const controlType = paligaRef.current.getControlType();
  const key = JSON.stringify(isReady);
  // console.log("> cc: ", controlType, paligaRef);

  /** 준비 완료 */
  useEffect(() => {
    setIsReady(true);
  }, []);

  /** 패널 외부 클릭 */
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!optionsPanelRef.current || !e.target) {
        return;
      }
      const isContain = optionsPanelRef.current.contains(e.target as Node);
      if (showOptions && !isContain) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showOptions]);

  if (!isReady) {
    return null;
  }

  return createPortal(
    <div data-paliga-dev-tool="root">
      {/* 옵션 패널 */}
      {showOptions && <DevToolOptionsPanel paligaRef={paligaRef} ref={optionsPanelRef} />}

      {/* 옵션 토글 버튼 */}
      <div data-paliga-dev-tool="options-toggle-button-container">
        <button
          data-paliga-dev-tool="options-toggle-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(true);
          }}
        >
          <GearIcon />
        </button>
      </div>

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
