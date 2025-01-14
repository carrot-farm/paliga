"use client";

import { TAnimateOptions } from "../../types";
import DevToolColorPicker from "./DevToolColorPicker";
import DevToolDireaction from "./DevToolDireaction";
import DevToolEasing from "./DevToolEasing";
import { TValues } from "./DevToolOptionsPanel";
import DevToolRange from "./DevToolRange";

/** ===== Components ===== */
function DevToolOptionSection({ onChange, ...options }: DevToolOptionSectionProps) {
  return (
    <div data-paliga-dev-tool="options-section">
      <h3>x</h3>
      <DevToolRange
        min={-1000}
        max={1000}
        fillOffset={0}
        value={options.x}
        onValueChange={(v) => onChange({ ...options, x: v })}
      />

      <h3>y</h3>
      <DevToolRange
        min={-1000}
        max={1000}
        fillOffset={0}
        value={options.y}
        onValueChange={(v) => onChange({ ...options, y: v })}
      />

      <h3>z</h3>
      <DevToolRange
        min={-1000}
        max={1000}
        fillOffset={0}
        value={options.z}
        onValueChange={(v) => onChange({ ...options, z: v })}
      />

      <h3>scaleX</h3>
      <DevToolRange
        min={0}
        max={5}
        step={0.1}
        value={options.scaleX}
        onValueChange={(v) => onChange({ ...options, scaleX: v })}
      />

      <h3>scaleY</h3>
      <DevToolRange
        min={0}
        max={5}
        step={0.1}
        value={options.scaleY}
        onValueChange={(v) => onChange({ ...options, scaleY: v })}
      />

      <h3>scaleZ</h3>
      <DevToolRange
        min={0}
        max={5}
        step={0.1}
        value={options.scaleZ}
        onValueChange={(v) => onChange({ ...options, scaleZ: v })}
      />

      <h3>rotateX</h3>
      <DevToolRange
        min={0}
        max={360}
        value={options.rotateX}
        onValueChange={(v) => onChange({ ...options, rotateX: v })}
      />

      <h3>rotateY</h3>
      <DevToolRange
        min={0}
        max={360}
        value={options.rotateY}
        onValueChange={(v) => onChange({ ...options, rotateY: v })}
      />

      <h3>rotateZ</h3>
      <DevToolRange
        min={0}
        max={360}
        value={options.rotateZ}
        onValueChange={(v) => onChange({ ...options, rotateZ: v })}
      />

      <h3>width</h3>
      <DevToolRange
        min={0}
        max={500}
        value={options.width}
        onValueChange={(v) => onChange({ ...options, width: v })}
      />

      <h3>height</h3>
      <DevToolRange
        min={0}
        max={500}
        value={options.height}
        onValueChange={(v) => onChange({ ...options, height: v })}
      />

      <h3>duration</h3>
      <DevToolRange
        min={0}
        max={10000}
        value={options.duration}
        onValueChange={(v) => onChange({ ...options, duration: v })}
      />

      <h3>delay</h3>
      <DevToolRange
        min={0}
        max={10000}
        value={options.delay}
        onValueChange={(v) => onChange({ ...options, delay: v })}
      />

      <h3>opacity</h3>
      <DevToolRange
        min={0}
        max={1}
        step={0.1}
        value={options.opacity}
        onValueChange={(v) => onChange({ ...options, opacity: v })}
      />

      <h3>iteration</h3>
      <DevToolRange
        min={0}
        max={10}
        step={1}
        value={options.iteration}
        onValueChange={(v) => onChange({ ...options, iteration: v })}
      />

      <h3>easing</h3>
      <DevToolEasing
        value={options.easing}
        onValueChange={(v) => onChange({ ...options, easing: v })}
      />

      <h3>direction</h3>
      <DevToolDireaction
        value={options.direction}
        onValueChange={(v) => onChange({ ...options, direction: v })}
      />

      <h3>borderWidth</h3>
      <DevToolRange
        min={0}
        max={10}
        value={options.borderWidth}
        onValueChange={(v) => onChange({ ...options, borderWidth: v })}
      />

      <h3>borderColor</h3>
      <DevToolColorPicker
        value={options.borderColor}
        onChange={(hexa) => onChange({ ...options, borderColor: hexa })}
      />

      <h3>background Color</h3>
      <DevToolColorPicker
        value={options.backgroundColor}
        onChange={(hexa) => onChange({ ...options, backgroundColor: hexa })}
      />
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolOptionSectionProps = { onChange: (values: TValues) => void } & TAnimateOptions;

export default DevToolOptionSection;
