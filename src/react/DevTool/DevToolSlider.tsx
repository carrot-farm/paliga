"use client";
import React, { useEffect, useRef, useState } from "react";
import { minMax } from "../../helpers/mathHelpers";

/** ===== Components ===== */
function DevToolSlider({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: DevToolSliderProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const offset = useRef<{
    startX: number;
    lastX: number;
    x: number;
    elX: number;
    progress: number;
    prevProgress: number;
  }>({
    startX: 0,
    lastX: 0,
    x: 0,
    elX: 0,
    progress: 0,
    prevProgress: 0,
  });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [minX] = useState(0);
  const [maxX, setMaxX] = useState(1);
  const [currentX, setCurrentX] = useState(0);
  const [p, setP] = useState(0);
  // const np = p * 100;
  // const progressX = Math.max(Math.min(currentX / maxX, maxX), minX);
  const diffX = maxX - minX;
  const diff = max - min;
  // const newValue = value !== undefined ? Number(value) : diff * progressX;
  // const steppedProgress = getStepProgress({
  //   value: newValue,
  //   min,
  //   max,
  //   step,
  // });
  // const steppedPercent = steppedProgress * 100;
  const stepRate = step / diff;
  const stepX = diffX * stepRate;
  // const steppedProgressX = getStepProgress({
  //   value: currentX,
  //   min: minX,
  //   max: maxX,
  //   step: stepX,
  // });

  // console.log("> ", stepRate);

  /** 마우스 다운 */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!bgRef.current) {
      return;
    }
    // console.log("> down: ", e.clientX, bgRef.current.getBoundingClientRect().x);
    offset.current.startX = e.clientX;
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

    progressRef.current.style.width = `${percent}%`;
    thumbRef.current.style.left = `${percent}%`;
  };

  /** 크기 확인 */
  useEffect(() => {
    const checkMaxX = () => {
      if (!bgRef.current) {
        return;
      }

      setMaxX(bgRef.current.clientWidth);
    };

    checkMaxX();
    window.addEventListener("resize", checkMaxX);
    return () => {
      window.removeEventListener("resize", checkMaxX);
    };
  }, []);

  /** 변경시 */
  // useEffect(() => {
  //   if (typeof onChange !== "function") {
  //     return;
  //   }
  //   const newValue = Math.max(Math.min(diff * steppedProgressX, max), min);
  //   onChange(newValue);
  // }, [steppedProgressX, diff, min, max, onChange]);

  /** 주입된 값 변경 시 */
  // useEffect(() => {
  //   if (value === undefined) {
  //     return;
  //   }

  //   const newCurrentX = Math.floor(diffX * steppedProgress);

  //   offset.current.lastX = newCurrentX;

  //   setCurrentX(newCurrentX);
  // }, [value, steppedProgress, diffX]);

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    const progress = getStepProgress({ value: Number(value), min, max, step });
    const x = Math.floor(diffX * progress);
    // console.log("> Value: ", min, max, step, value, progress);

    // offset.current.x = x;
    // offset.current.lastX = x;
    offset.current.prevProgress = progress;

    setCurrentX(x);
    changeProgressBar(progress);
  }, [value, min, max, step, diffX]);

  /** 이벤트 */
  useEffect(() => {
    /** 마우스 움직임 */
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const { startX, lastX, elX, prevProgress } = offset.current;
      // const addX = e.clientX - startX;
      // const calcX = minMax(lastX + addX, minX, maxX);
      const calcX = minMax(e.clientX - elX, minX, maxX);
      const progress = getStepProgress({ value: calcX, min: minX, max: maxX, step: stepX });

      if (typeof onChange === "function" && progress !== prevProgress) {
        const value = minMax(diff * progress, min, max);
        onChange({ value, progress });
      }

      offset.current.prevProgress = progress;

      if (value !== undefined) {
        return;
      }
      offset.current.x = calcX;
      offset.current.progress = progress;

      setP(progress);
      setCurrentX(calcX);
      changeProgressBar(progress);
    };

    /** 마우스 업 */
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      // const lastX = diffX * steppedProgress;
      const lastX = Math.floor(diffX * offset.current.progress);
      // console.log("> up: ", offset.current.progress);

      offset.current.lastX = lastX;
      offset.current.x = lastX;

      setCurrentX(lastX);
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
      <div data-paliga-dev-tool="dev-tool-slider__left-container"></div>
      <div data-paliga-dev-tool="dev-tool-slider__center-container">
        <p style={{ position: "absolute", top: "-60px", fontSize: "0.8rem" }}>x: {currentX}</p>
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
        ></div>
      </div>
      <div data-paliga-dev-tool="dev-tool-slider__right-container"></div>
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
  // return minMax(Math.round(newValue / step) / rate, 0, 1);
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
  /** value */
  value?: number | string;
  /** 변경 시 콜백 */
  onChange?: (data: { progress: number; value: number }) => void;
};

export default DevToolSlider;
