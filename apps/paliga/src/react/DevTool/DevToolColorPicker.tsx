"use client";

import { ChangeEvent, useState } from "react";
import { convertToRgba, convertToRgbaNumbers, rgbToHexWithAlpha } from "../../helpers/styleHelpers";

/** ===== Components ===== */
function DevToolColorPicker({ value, onChange }: DevToolColorPickerProps) {
  const [rgba, setRgba] = useState(() =>
    typeof value === "string" ? convertToRgbaNumbers(convertToRgba.router(value)) : value,
  );
  const alpha = rgba ? rgba[3] : 1;
  const hexa = rgba ? rgbToHexWithAlpha(rgba[0], rgba[1], rgba[2], alpha) : undefined;

  /** color change */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = convertToRgba.router(e.currentTarget.value);
    const [r, g, b] = convertToRgbaNumbers(value);
    const a = rgba?.[3] ?? 1;
    const hexa = rgbToHexWithAlpha(r, g, b, a);

    setRgba([r, g, b, a]);
    onChange(hexa);
  };

  /** alpha change */
  const handleAlphaChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value.endsWith(".")) {
      return;
    }

    const [r, g, b] = rgba ?? [0, 0, 0, 1];
    const a = Number(value);
    const hexa = rgbToHexWithAlpha(r, g, b, a);

    setRgba([r, g, b, a]);
    onChange(hexa);
  };

  return (
    <div data-paliga-dev-tool="color-picker">
      <input type="color" value={hexa} onChange={handleChange} />
      <input
        type="number"
        min={0}
        max={1}
        step={0.1}
        value={alpha}
        data-paliga-dev-tool="input"
        onChange={handleAlphaChnage}
      />
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolColorPickerProps = {
  /** 값 */
  value?: string | [number, number, number, number];
  /** 값 변경 */
  onChange: (hexa: string) => void;
};

export default DevToolColorPicker;
