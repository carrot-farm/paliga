/** 프레인 실행기 */
export const framer = ({
  duration,
  startProgress = 0,
  endProgress = 1,
  onFrame,
  onPaused,
  onDone,
}: TFramerParams) => {
  const addedTime = duration * startProgress;
  let startTime: number;

  const step = (timestamp: number = addedTime) => {
    if (startTime === undefined) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime + addedTime;
    const progress = Math.min(elapsed / duration, endProgress);
    const result = onFrame({ progress, elapsed });

    if (result === false) {
      if (typeof onPaused === "function") {
        onPaused({ progress, elapsed });
      }
      return;
    }

    if (progress >= endProgress) {
      if (typeof onDone === "function") {
        onDone({ progress, elapsed });
      }
      return;
    }

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

/** ===== Types ===== */
export type TFramerParams = {
  /** 실행 시간(ms) */
  duration: number;
  /** 정의 시 애니메이션 실행 시작 지점 정의(0 ~ 1) */
  startProgress?: number;
  /** 정의 시 애니메이션 실행 시작 지점 정의(0 ~ 1, default: 1) */
  endProgress?: number;
  /** 정의 시 매 프레임 마다 호출 */
  onFrame: (params: TCallbackParams) => boolean | void;
  /** 임의 중단 시 호출 */
  onPaused?: (params: TCallbackParams) => void;
  /** 종료 시 호출 */
  onDone?: (params: TCallbackParams) => void;
};

type TCallbackParams = { progress: number; elapsed: number };
