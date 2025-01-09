"use client";

import { useEffect, useState } from "react";
import { DevToolProps } from "./DevTool";
import DevToolSlider from "./DevToolSlider";
import PauseIcon from "./PauseIcon";
import PlayIcon from "./PlayIcon";

/** ===== Components ===== */
/** progress slider */
function ProgressSlider({ paligaRef }: { paligaRef: DevToolProps["paligaRef"] }) {
  const totalDuration = paligaRef.current.getTotalDuration();
  const schedule = paligaRef.current.getSchedule();
  const delimiters = schedule
    .map((a) => a.animations)
    .flat()
    .filter((_, i) => i > 0)
    .map((a) => ({ progress: a.from.progress, duration: a.from.duration }));
  const [progress, setProgress] = useState(() => paligaRef.current.getProgress());
  const [elapsed, setElapsed] = useState(() => getElapsed(totalDuration, progress));
  const [state, setState] = useState<ReturnType<typeof paligaRef.current.getState>>(() =>
    paligaRef.current.getState(),
  );

  /** 실행 클릭 */
  const handlePlayClick = () => {
    if (progress === 0 || progress === 1) {
      paligaRef.current.play();
    } else if (state === "running") {
      paligaRef.current.pause();
    } else {
      paligaRef.current.resume();
    }
  };

  /** 자리 표시자 클릭 */
  const handleDelimiterClick = ({ progress }: { progress: number; duration: number }) => {
    const newProgress = Number(progress.toFixed(2));

    moveProgress(newProgress);
  };

  /** progress 셋팅 */
  const moveProgress = (progress: number) => {
    setProgress(progress);
    setElapsed(getElapsed(totalDuration, progress));
    paligaRef.current.progress(progress);
  };

  /** 프레임 옵저버 */
  useEffect(() => {
    paligaRef.current.observeFrame((a) => {
      setState(a.state);
      setProgress(Number(a.progress.toFixed(2)));
      setElapsed(getElapsed(totalDuration, a.progress));
    });
  }, [totalDuration]);

  return (
    <div data-paliga-dev-tool="progress-slider">
      <div data-paliga-dev-tool="progress-slider__info-container">
        {elapsed.toLocaleString("ko-KR")} ms / {totalDuration.toLocaleString("ko-KR")} ms
      </div>

      <div data-paliga-dev-tool="progress-slider__container">
        <div data-paliga-dev-tool="progress-slider__left">
          <button data-paliga-dev-tool="progress-slider__play-button" onClick={handlePlayClick}>
            {state === "running" ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        <div data-paliga-dev-tool="progress-slider__progress-wrapper">
          {delimiters.length > 0 && (
            <div data-paliga-dev-tool="progress-slider__delimiters-container">
              {delimiters.map((a) => (
                <Delimiter
                  progress={a.progress}
                  duration={a.duration}
                  key={a.progress}
                  onClick={handleDelimiterClick}
                />
              ))}
            </div>
          )}

          <DevToolSlider
            // min={0}
            // max={1}
            // step={0.01}
            // value={progress.toFixed(2)}
            // onChange={({ value }) => moveProgress(value)}

            min={-100}
            max={100}
            step={20}
            // value={progress.toFixed(2)}
            // onChange={({ value }) => moveProgress(value)}
          />
        </div>

        <div data-paliga-dev-tool="progress-slider__right">{progress}</div>
      </div>
    </div>
  );
}

function Delimiter({
  progress,
  duration,
  onClick,
}: {
  progress: number;
  duration: number;
  onClick: (data: { progress: number; duration: number }) => void;
}) {
  const percent = Math.floor(progress * 100);

  return (
    <button
      data-paliga-dev-tool="progress-slider__delimiter"
      style={{ left: `${percent}%` }}
      onClick={() => onClick({ progress, duration })}
    >
      {/* {duration.toLocaleString("ko-KR")} */}
    </button>
  );
}

/** ===== Others ===== */
const getElapsed = (totalDuration: number, progress: number) =>
  Math.floor(totalDuration * progress);

/** ===== Types ===== */
export type ProgressSliderProps = {};

export default ProgressSlider;
