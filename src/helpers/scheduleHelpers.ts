import { TAnimation, TAnimationState, TSchedule, TSegment } from "../types";
import { animationsRunner } from "./animationHelpers";

/** 스케쥴을 실행 */
type TScheduleRunnerParams = {
  scheduleList: TSchedule[];
  onFrame?: (data: TScheduleRunnerOnParams) => void | boolean;
  onAnimationEnd?: (data: TScheduleRunnerOnParams) => void;
} & Omit<
  Parameters<typeof animationsRunner>[0],
  "maxDuration" | "animations" | "onFrame" | "onAnimationEnd"
>;
export type TScheduleRunnerOnParams = {
  progress: number;
  elapsed: number;
  index: number;
  schedule: TSchedule;
};
export const scheduleRunner = ({
  startProgress,
  endProgress,
  scheduleList,
  duration,
  onFrame,
  onAnimationEnd,
}: TScheduleRunnerParams) => {
  const len = scheduleList.length;
  let i = 0;

  const runner = ({
    startProgress,
    endProgress,
  }: Pick<Parameters<typeof scheduleRunner>[0], "startProgress" | "endProgress">) => {
    let doneIndex = 0;
    while (i < len) {
      const schedule = scheduleList[i];
      const { maxDuration, animations } = schedule;
      const newDuration = duration ?? maxDuration;

      animationsRunner({
        startProgress,
        endProgress,
        duration: newDuration,
        maxDuration,
        animations,
        onFrame: ({ progress, elapsed }) => {
          if (onFrame) {
            return onFrame({ progress, elapsed, index: doneIndex, schedule });
          }
        },
        onAnimationEnd: ({ progress, elapsed }) => {
          if (onAnimationEnd) {
            onAnimationEnd({ progress, elapsed, index: doneIndex, schedule });
          }
          doneIndex++;
        },
      });

      i++;
    }
  };

  runner({ startProgress, endProgress });
};

/** 스케쥴 반환 */
export const getSchedule = ({
  totalDuration,
  segments,
}: {
  totalDuration: number;
  segments: TSegment[];
}) => {
  const len = segments.length;
  const schedule: TSchedule[] = [];
  let k = 0;

  // # 세그먼트 순회
  while (k < len) {
    const segment = segments[k];
    const curSchedule: TSchedule = {
      id: segment.id,
      state: "idle",
      maxDuration: segment.maxDuration,
      progress: 0,
      element: segment.element,
      animations: [],
    };
    const animations = curSchedule.animations;
    const { transitions } = segment;
    const tLen = transitions.length;
    let prevAnimation: TAnimation | undefined = undefined;
    let j = 0;

    // # 트랜지션 순회
    while (j < tLen) {
      const transition = transitions[j];
      const curDelay = transition.delay ?? 0;
      // const sumDuration = transition.duration + curDelay;

      // # 시작점
      const fromDuration = prevAnimation ? prevAnimation.to.duration : 0;
      const from: TAnimationState = {
        duration: fromDuration,
        progress: prevAnimation ? prevAnimation.to.progress : 0,
        x: prevAnimation?.to.x ?? (transition.x !== undefined ? 0 : undefined),
        y: prevAnimation?.to.y ?? (transition.y !== undefined ? 0 : undefined),
        opacity:
          prevAnimation?.to.opacity ??
          (transition.opacity !== undefined
            ? Number(transition.element.style.opacity ?? 1)
            : undefined),
      };

      // # 딜레이
      const toDelay: TAnimation["toDelay"] = transition.delay
        ? {
            duration: fromDuration + curDelay,
            progress: (fromDuration + curDelay) / totalDuration,
          }
        : undefined;

      // # 종료
      const toDuration = toDelay
        ? toDelay.duration + transition.duration
        : from.duration + transition.duration;
      const toProgress = j === tLen - 1 ? 1 : toDuration / totalDuration;

      const to: TAnimationState = {
        duration: toDuration,
        progress: toProgress,
        x: transition.x
          ? transition.direction === "reverse"
            ? -transition.x + (from.x ?? 0)
            : transition.x + (from.x ?? 0)
          : transition.x,
        y: transition.y
          ? transition.direction === "reverse"
            ? -transition.y + (from.y ?? 0)
            : transition.y + (from.y ?? 0)
          : transition.y,
        opacity: transition.opacity,
      };

      const newTo: TAnimationState = {
        duration: to.duration,
        progress: to.progress,
        x: to.x === undefined && from.x !== undefined ? from.x : to.x,
        y: to.y === undefined && from.y !== undefined ? from.y : to.y,
        opacity: to.opacity === undefined && from.opacity !== undefined ? from.opacity : to.opacity,
      };

      // 스케쥴
      const newAnimation: TAnimation = {
        // sumDuration,
        from,
        toDelay,
        to: newTo,
        element: transition.element,
        direction: transition.direction,
        duration: transition.duration,
        // fillMode: transition.fillMode,
        delay: transition.delay,
        easing: transition.easing,
        onFrame: transition.onFrame,
      };

      prevAnimation = newAnimation;

      animations.push(newAnimation);

      j++;
    }

    schedule.push(curSchedule);

    k++;
  }

  return schedule;
};
