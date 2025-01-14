"use client";

import { forwardRef, MutableRefObject, Ref, useState } from "react";
import { Paliga } from "../../core/Paliga";
import { timeoutFn } from "../../core/timeUtils";
import { copyClipboard } from "../../helpers/clipboard";
import { TAnimate } from "../../types";
import DevToolOptionSection from "./DevToolOptionSection";

/** ===== Components ===== */
function DevToolOptionsPanel({ paligaRef }: DevToolOptionsPanelProps, ref: Ref<HTMLDivElement>) {
  const debounce = timeoutFn("debounce");
  const [animateIndex, setAnimateIndex] = useState(0);
  const [animates, setAnimates] = useState<TAnimate[]>(() =>
    paligaRef.current.getAnimates().map((a) => ({ ...a, duration: a.duration ?? 1000 })),
  );
  const animate = animates[animateIndex];

  /** 값 재적용 */
  const reload = (newAnimates?: TAnimate[]) => {
    const innerAnimates = newAnimates ?? animates;

    paligaRef.current.setTimeline(innerAnimates);
  };

  /** 값 변경 */
  const handleChange = (values: TValues, index: number) => {
    const newAnimates = animates.map((a, i) =>
      i === index ? { ...a, ...values } : a,
    ) as TAnimate[];

    setAnimates(newAnimates);
    debounce(() => {
      reload(newAnimates);
    });
  };

  /** 옵션 복사 */
  const hanelCopy = () => {
    const newAnimates = animates.map(({ elements, ...args }) => args);
    const newAnimatesString = `timeline={${JSON.stringify(newAnimates, null, 2)}}`;

    copyClipboard(newAnimatesString, {
      onSuccess: () => {
        alert("Paste it into the component`s props");
      },
      onError: () => {
        alert("Failed to copy to clipboard.");
      },
    });
  };

  /** 옵션 제거 */
  const hanelRemove = (index: number) => {
    const newAnimates = animates.filter((_, i) => i !== index);

    setAnimates(newAnimates);
    reload(newAnimates);
    setAnimateIndex(Math.max(animateIndex - 1, 0));
  };

  /** 옵션 추가 */
  const handleAddClick = () => {
    const newAnimates = [...animates, {}] as TAnimate[];

    setAnimates(newAnimates);
    reload(newAnimates);
  };

  return (
    <div data-paliga-dev-tool="options-panel" ref={ref}>
      <div data-paliga-dev-tool="options-section__animate-selector-container">
        <div data-paliga-dev-tool="options-section__animate-selector-wrapper">
          {Array.from({ length: animates.length }, (_, i) => (
            <button
              key={`selector-${i}`}
              aria-label="select animate index"
              className={i === animateIndex ? "active_selector" : ""}
              onClick={(e) => {
                e.stopPropagation();
                setAnimateIndex(i);
              }}
            >
              {i}
            </button>
          ))}
        </div>
        <div>
          <button
            data-paliga-dev-tool="options-section__add"
            onClick={(e) => {
              e.preventDefault();
              handleAddClick();
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* options */}
      <div data-paliga-dev-tool="options-section-container">
        {animate && (
          <div data-paliga-dev-tool="options-section-wrapper">
            <div data-paliga-dev-tool="options-section-header">
              {/* <h3>{i + 1}.</h3> */}
              <span></span>

              {animateIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    hanelRemove(animateIndex);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
            <DevToolOptionSection
              {...animate}
              onChange={(values) => handleChange(values, animateIndex)}
            />
          </div>
        )}
      </div>

      <div data-paliga-dev-tool="options-footer-section">
        <button data-paliga-dev-tool="options-footer-section__copy" onClick={hanelCopy}>
          Copy
        </button>
      </div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type DevToolOptionsPanelProps = {
  /** 인스턴스 */
  paligaRef: MutableRefObject<Paliga>;
};

export type TValues = { [k in keyof TAnimateObj]?: string | TAnimateObj[k] };
type TAnimateObj = Omit<TAnimate, "elements">;

export default forwardRef(DevToolOptionsPanel);
