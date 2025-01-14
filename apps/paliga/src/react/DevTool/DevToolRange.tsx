"use client";
import { useState } from "react";
import DevToolSlider, { DevToolSliderProps } from "./DevToolSlider";

/** ===== Components ===== */
function DevToolRange({
  value,
  min,
  max,
  fillOffset,
  disabled,
  step = 1,
  onValueChange,
}: DevToolRangeProps) {
  const [newMin, setNewMin] = useState(min);
  const [newMax, setNewMax] = useState(max);

  return (
    <div aria-disabled={disabled ? "true" : "false"} data-paliga-dev-tool="range-root">
      <DevToolSlider
        min={newMin}
        max={newMax}
        fillOffset={fillOffset}
        step={step}
        value={value}
        onChange={({ value }) => onValueChange(value)}
      />
      <div data-paliga-dev-tool="range-numbers-container">
        <input
          type="number"
          data-paliga-dev-tool="range-min"
          value={newMin}
          step={1}
          onChange={(e) => setNewMin(Number(e.currentTarget.value ?? "0"))}
        />
        <input
          type="number"
          data-paliga-dev-tool="range-value"
          value={value}
          step={step}
          onChange={(e) => {
            let value = e.currentTarget.value;

            if (value.endsWith(".")) {
              onValueChange(value);
              return;
            }
            onValueChange(Number(value));
          }}
        />
        <input
          type="number"
          data-paliga-dev-tool="range-max"
          value={newMax}
          step={1}
          onChange={(e) => setNewMax(Number(e.currentTarget.value ?? "0"))}
        />
      </div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolRangeProps = {
  /** 비활성화 */
  disabled?: boolean;
  /** 값 변경 */
  onValueChange: (value: number | string) => void;
} & Omit<DevToolSliderProps, "leftContent" | "rightContent" | "onChange">;

export default DevToolRange;
