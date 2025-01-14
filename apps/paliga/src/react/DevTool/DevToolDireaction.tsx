"use client";

import { TDirection } from "../../types";

/** ===== Components ===== */
function DevToolDireaction({ value, onValueChange }: DevToolDireactionProps) {
  return (
    <div data-paliga-dev-tool="direction-root">
      <select
        value={value}
        data-paliga-dev-tool="select"
        onChange={(e) => {
          const value = e.currentTarget.value as TDirection;
          onValueChange(value);
        }}
      >
        {options.map((a, i) => (
          <option value={a} key={`direction-${a}-${i}`}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

/** ===== Others ===== */
const options: TDirection[] = ["normal", "reverse", "alternate"];

/** ===== Types ===== */
export type DevToolDireactionProps = {
  /** value */
  value?: TDirection;
  /** change value */
  onValueChange: (direction: TDirection) => void;
};

export default DevToolDireaction;
