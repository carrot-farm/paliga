import { TAnimation, TAnimationState, TSchedule, TSegment, TTransition } from "../types";
import { animationsRunner } from "./animationHelpers";
import { convertToRgbaNumbers, getElementStyleToNumber } from "./styleHelpers";

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
      const from = getFromAnimationState({ prevAnimation, transition });

      // # 딜레이
      const toDelay: TAnimation["toDelay"] = transition.delay
        ? {
            duration: from.duration + curDelay,
            progress: (from.duration + curDelay) / totalDuration,
          }
        : undefined;

      // # 종료
      const toDuration = toDelay
        ? toDelay.duration + transition.duration
        : from.duration + transition.duration;
      const toProgress = j === tLen - 1 ? 1 : toDuration / totalDuration;
      const to = getToAnimationState({
        duration: toDuration,
        progress: toProgress,
        from,
        transition,
      });

      // console.log("> ", from, to);

      // 스케쥴
      const newAnimation: TAnimation = {
        from,
        toDelay,
        to,
        element: transition.element,
        direction: transition.direction,
        duration: transition.duration,
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

/** `fromAnimateion`구성 */
export const getFromAnimationState = ({
  prevAnimation,
  transition,
}: {
  // element
  prevAnimation?: TAnimation;
  transition: TTransition;
}): TAnimationState => {
  const { element } = transition;
  const {
    duration = 0,
    progress = 0,
    x = transition.x !== undefined ? 0 : undefined,
    y = transition.y !== undefined ? 0 : undefined,
    z = transition.z !== undefined ? 0 : undefined,
    scaleX = transition.scaleX !== undefined || transition.scale !== undefined ? 1 : undefined,
    scaleY = transition.scaleY !== undefined || transition.scale !== undefined ? 1 : undefined,
    scaleZ = transition.scaleZ !== undefined ? 1 : undefined,
    rotateX = transition.rotateX !== undefined ? 0 : undefined,
    rotateY = transition.rotateY !== undefined ? 0 : undefined,
    rotateZ = transition.rotateZ !== undefined || transition.rotate !== undefined ? 0 : undefined,
    width = transition.width !== undefined ? getElementStyleToNumber(element, "width") : undefined,
    height = transition.height !== undefined
      ? getElementStyleToNumber(element, "height")
      : undefined,
    opacity = transition.opacity !== undefined
      ? getElementStyleToNumber(element, "opacity")
      : undefined,
    borderWidth = transition.borderWidth !== undefined
      ? getElementStyleToNumber(element, "border-width")
      : undefined,
    borderColor = transition.borderColor !== undefined
      ? convertToRgbaNumbers(
          element.computedStyleMap().get("border-color")?.toString() ?? "rgba(0,0,0,0)",
        )
      : undefined,
    backgroundColor = transition.backgroundColor !== undefined
      ? convertToRgbaNumbers(
          element.computedStyleMap().get("background-color")?.toString() ?? "rgba(0,0,0,0)",
        )
      : undefined,
  }: TAnimationState = prevAnimation?.to ?? {
    duration: 0,
    progress: 0,
  };

  // console.log("> from: ", scaleX);

  return {
    duration,
    progress,
    x,
    y,
    z,
    scaleX,
    scaleY,
    scaleZ,
    rotateX,
    rotateY,
    rotateZ,
    width,
    height,
    opacity,
    borderWidth,
    borderColor,
    backgroundColor,
  };
};

/** `toAnimationState` 구성 */
export const getToAnimationState = ({
  duration,
  progress,
  from,
  transition,
}: {
  duration: number;
  progress: number;
  from: TAnimationState;
  transition: TTransition;
}) => {
  const {
    direction,
    backgroundColor,
    x,
    y,
    z,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    width,
    height,
    opacity,
    borderWidth,
    borderColor,
  } = transition;
  const to: TAnimationState = {
    duration,
    progress,
    x: getDirectionValue(x, from.x, direction === "reverse"),
    y: getDirectionValue(y, from.y, direction === "reverse"),
    z: getDirectionValue(z, from.z, direction === "reverse"),
    scaleX: typeof (scaleX ?? scale) === "number" ? (scaleX ?? scale) : from.scaleX,
    scaleY: typeof (scaleY ?? scale) === "number" ? (scaleY ?? scale) : from.scaleY,
    scaleZ: typeof scaleZ === "number" ? scaleZ : from.scaleZ,
    rotateX: getDirectionValue(rotateX, from.rotateX, direction === "reverse"),
    rotateY: getDirectionValue(rotateY, from.rotateY, direction === "reverse"),
    rotateZ: getDirectionValue(rotateZ ?? rotate, from.rotateZ, direction === "reverse"),
    width: typeof width === "number" ? width : from.width,
    height: typeof height === "number" ? height : from.height,
    opacity: typeof opacity === "number" ? opacity : from.opacity,
    borderWidth: typeof borderWidth === "number" ? borderWidth : from.borderWidth,
    borderColor:
      typeof borderColor === "string" ? convertToRgbaNumbers(borderColor) : from.borderColor,
    backgroundColor:
      typeof backgroundColor === "string"
        ? convertToRgbaNumbers(backgroundColor)
        : from.backgroundColor,
  };

  // console.log("> to: ", from, to);

  return to;
};

/** 방향에 따른 값을 반환 */
const getDirectionValue = (
  value?: number,
  fromValue: number | undefined = undefined,
  isReverse: boolean = false,
) => {
  if (value === undefined) {
    return fromValue;
  }
  const newFromValue = fromValue ?? 0;

  return isReverse ? -value + newFromValue : value + newFromValue;
};
