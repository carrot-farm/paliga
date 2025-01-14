"use client";

import { useEffect, useState } from "react";
import { TEasing } from "../../types";

/** ===== Components ===== */
function DevToolEasing({ value, onValueChange }: DevToolEasingProps) {
  const [easingType, setEasingType] = useState<TEasingType>(() => "linear");
  const [cubicBezier, setCubicBezier] = useState<(string | number)[]>(() =>
    Array.isArray(value) ? value : ["0.15", "0.95", "1", "0.12"],
  );

  /** cubic bezier 변경 */
  const handleCubicBezier = (cubicBezier: (string | number)[]) => {
    const newNumbers = cubicBezier.map((a) => Number(a));
    const invalid = newNumbers.every((a) => isNaN(a));

    if (invalid || newNumbers.length !== 4) {
      throw new Error("invalid cubicBezier: " + cubicBezier);
    }

    onValueChange(newNumbers as TEasing);
  };

  /** easing type 변경 */
  const handleEasingTypeChange = (easingType: TEasingType) => {
    setEasingType(easingType);

    if (easingType === "cubicBezier") {
      handleCubicBezier(cubicBezier);
      return;
    }

    onValueChange(easingType);
  };

  /** 이지 타입ㅣ지정 */
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    if (Array.isArray(value)) {
      setEasingType("cubicBezier");
      return;
    }
    setEasingType(value);
  }, [value]);

  return (
    <div data-paliga-dev-tool="easing-root">
      <div>
        <select
          data-paliga-dev-tool="select"
          value={easingType}
          onChange={(e) => {
            e.stopPropagation();

            handleEasingTypeChange(e.currentTarget.value as TEasingType);
          }}
        >
          {options.map((a, i) => (
            <option value={a} key={`easing-${a}-${i}`}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {easingType === "cubicBezier" && (
        <div data-paliga-dev-tool="easing__bezier-container">
          <input
            data-paliga-dev-tool="input"
            min={0}
            max={3}
            step={0.01}
            placeholder="p1x"
            value={cubicBezier[0]}
            onChange={(e) => {
              const p1x = e.currentTarget.value;
              const newCubicBezier = [p1x, cubicBezier[1], cubicBezier[2], cubicBezier[3]];
              setCubicBezier(newCubicBezier);
              handleCubicBezier(newCubicBezier);
            }}
          />
          <input
            data-paliga-dev-tool="input"
            min={0}
            max={3}
            step={0.01}
            placeholder="p1y"
            value={cubicBezier[1]}
            onChange={(e) => {
              const p1y = e.currentTarget.value;
              const newCubicBezier = [cubicBezier[0], p1y, cubicBezier[2], cubicBezier[3]];
              setCubicBezier(newCubicBezier);
              handleCubicBezier(newCubicBezier);
            }}
          />
          <input
            data-paliga-dev-tool="input"
            min={0}
            max={3}
            step={0.01}
            placeholder="p2x"
            value={cubicBezier[2]}
            onChange={(e) => {
              const p2x = e.currentTarget.value;
              const newCubicBezier = [cubicBezier[0], cubicBezier[1], p2x, cubicBezier[3]];
              setCubicBezier(newCubicBezier);
              handleCubicBezier(newCubicBezier);
            }}
          />
          <input
            data-paliga-dev-tool="input"
            min={0}
            max={3}
            step={0.01}
            placeholder="p2y"
            value={cubicBezier[3]}
            onChange={(e) => {
              const p2y = e.currentTarget.value;
              const newCubicBezier = [cubicBezier[0], cubicBezier[1], cubicBezier[2], p2y];
              setCubicBezier(newCubicBezier);
              handleCubicBezier(newCubicBezier);
            }}
          />
        </div>
      )}
    </div>
  );
}

/** ===== Others ===== */
const options: TEasingType[] = [
  "linear",
  "ease",
  "easeIn",
  "easeInOut",
  "easeInOut",
  "easeInBounce",
  "easeOutBounce",
  "cubicBezier",
];

/** ===== Types ===== */
export type DevToolEasingProps = {
  /** 값 */
  value?: TEasing;
  /** 값 변경 */
  onValueChange: (easing: TEasing) => void;
};

type TEasingType = Exclude<TEasing, [number, number, number, number]> | "cubicBezier";

export default DevToolEasing;
