"use client";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { minMax } from "../../helpers/mathHelpers";

/** ===== Components ===== */
function DevToolSlider({
  className,
  min = 0,
  max = 100,
  step = 1,
  fillOffset = min,
  value,
  leftContent,
  rightContent,
  onChange,
}: DevToolSliderProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const offset = useRef<{ elX: number; prevProgress: number }>({ elX: 0, prevProgress: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [minX] = useState(0);
  const [maxX, setMaxX] = useState(1);
  const diffX = maxX - minX;
  const diff = max - min;
  const stepRate = step / diff;
  const stepX = diffX * stepRate;
  const fillOffsetProgress = useMemo(() => {
    const progress = getStepProgress({ value: fillOffset, min, max, step });
    return progress;
  }, [fillOffset, min, max, step]);

  /** 마우스 다운 */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!bgRef.current) {
      return;
    }
    // console.log("> down: ", e.clientX, bgRef.current.getBoundingClientRect().x);
    offset.current.elX = Math.floor(bgRef.current.getBoundingClientRect().x);
    setMaxX(bgRef.current.clientWidth);
    document.body.setAttribute("data-paliga-dev-tool_slider-grabbing", "true");
    setIsGrabbing(true);
  };

  /** progress 변경 */
  const changeProgressBar = (progress: number) => {
    if (!progressRef.current || !thumbRef.current) {
      return;
    }
    const percent = progress * 100;
    const progressBarPosition = progress >= fillOffsetProgress ? "fillOffset" : "thumb";

    if (progressBarPosition === "fillOffset") {
      const progressPercent = (progress - fillOffsetProgress) * 100;
      progressRef.current.style.left = `${Math.floor(fillOffsetProgress * 100)}%`;
      progressRef.current.style.width = `${progressPercent}%`;
    } else {
      const progressPercent = (fillOffsetProgress - progress) * 100;
      // console.log("> ", progress, fillOffsetProgress, progressBarPosition);
      progressRef.current.style.left = `${percent}%`;
      progressRef.current.style.width = `${progressPercent}%`;
    }

    thumbRef.current.style.left = `${percent}%`;
    offset.current.prevProgress = progress;
  };

  // console.log("> ", fillOffsetProgress);

  /** 크기 확인 */
  useEffect(() => {
    if (isReady) {
      return;
    }
    // # filloffset
    if (value === undefined && fillOffsetProgress > 0) {
      changeProgressBar(fillOffsetProgress);
    }

    // # maxX 셋팅
    const checkMaxX = () => {
      if (!bgRef.current) {
        return;
      }
      offset.current.elX = Math.floor(bgRef.current.getBoundingClientRect().x);
      setMaxX(bgRef.current.clientWidth);
    };

    checkMaxX();
    window.addEventListener("resize", checkMaxX);
    setIsReady(true);
    return () => {
      window.removeEventListener("resize", checkMaxX);
    };
  }, [isReady]);

  // # 값이 있을 경우 반영
  useEffect(() => {
    if (value === undefined) {
      return;
    }

    const progress = getStepProgress({ value: Number(value), min, max, step });

    changeProgressBar(progress);
  }, [value, min, max, step]);

  /** 이벤트 */
  useEffect(() => {
    /** 마우스 움직임 */
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const { elX, prevProgress } = offset.current;
      const calcX = minMax(e.clientX - elX, minX, maxX);
      const progress = getStepProgress({ value: calcX, min: minX, max: maxX, step: stepX });

      if (typeof onChange === "function" && progress !== prevProgress) {
        const value = minMax(diff * progress + min, min, max);
        onChange({ value, progress });
      }

      if (value !== undefined) {
        return;
      }
      changeProgressBar(progress);
    };

    /** 마우스 업 */
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setIsGrabbing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.removeAttribute("data-paliga-dev-tool_slider-grabbing");
    };

    if (isGrabbing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return;
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isGrabbing]);

  return (
    <div data-paliga-dev-tool="dev-tool-slider" className={className}>
      <div data-paliga-dev-tool="dev-tool-slider__left-container">{leftContent}</div>

      <div data-paliga-dev-tool="dev-tool-slider__center-container">
        {/* progress */}
        <div data-paliga-dev-tool="dev-tool-slider__progress" ref={progressRef}></div>

        {/* bg slider */}
        <div data-paliga-dev-tool="dev-tool-slider__bg" ref={bgRef}></div>

        {/* thumb */}
        <div
          data-paliga-dev-tool="dev-tool-slider__thumb-container"
          data-is-granning={isGrabbing}
          ref={thumbRef}
          onMouseDown={handleMouseDown}
        >
          <div data-paliga-dev-tool="dev-tool-slider__thumb"></div>
        </div>
      </div>

      <div data-paliga-dev-tool="dev-tool-slider__right-container">{rightContent}</div>
    </div>
  );
}

/** ===== Others ===== */
const getStepProgress = ({
  value,
  min,
  max,
  step,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
}) => {
  if (value <= min) {
    return 0;
  }
  if (value >= max) {
    return 1;
  }

  const newValue = value - min;
  const diff = max - min;
  const rate = diff / step;
  return Math.round(newValue / step) / rate;
};

/** ===== Types ===== */
export type DevToolSliderProps = {
  /** class */
  className?: string;
  /** 최소값 */
  min?: number;
  /** 최대값 */
  max?: number;
  /** 움직임 단위 */
  step?: number;
  /** 정의시 슬라이더를 움직일 기준선을 세운다 */
  fillOffset?: number;
  /** value */
  value?: number | string;
  /** 왼쪽 렌더링 */
  leftContent?: ReactNode;
  /** 오른쪽 렌더링 */
  rightContent?: ReactNode;
  /** 변경 시 콜백 */
  onChange?: (data: { progress: number; value: number }) => void;
};

export default DevToolSlider;
