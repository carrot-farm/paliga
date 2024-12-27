import { ApplyStyles } from "../core/ApplyStyles";
import { Easing } from "../core/Easing";
import { framer } from "../core/framer";
import { TAnimation, TStylesState } from "../types";
import { getProgress, getProgressValue } from "./progressHelpers";

/**
 * startProgress, endProgress 사이의 애니메이션 정보를 반환
 */
export const getRangeAnimations = ({
  startProgress,
  endProgress,
  animations,
}: {
  startProgress: number;
  endProgress: number;
  animations: TAnimation[];
}) => {
  const newAnimations: TAnimation[] = [];
  const len = animations.length;
  let i = 0;

  if (endProgress <= 0) {
    return [animations[0]];
  }
  if (startProgress >= 1) {
    return [animations[len - 1]];
  }

  while (i < len) {
    const animation = animations[i];

    if (
      (startProgress < animation.to.progress && endProgress > animation.from.progress) ||
      (startProgress === endProgress && startProgress === animation.from.progress)
    ) {
      newAnimations.push(animation);
    }

    i++;
  }
  return newAnimations;
};

/**
 * 애니메이션 리스트에서 지정된 progress의 범위에 해당하는 애니메이션을 찾기
 */
export const findProgressAnimation = ({
  animations,
  progress,
}: {
  progress: number;
  animations: TAnimation[];
}) => {
  const len = animations.length;
  let finded: TAnimation | undefined;
  let k = 0;

  while (k < len) {
    const animation = animations[k];
    if (animation.from.progress <= progress && animation.to.progress >= progress) {
      finded = animation;
      break;
    }
    k++;
  }

  return finded;
};

/**
 * progress 와 animation 을 기준으로 스타일 반환
 */
export const getAnimationToStyle = ({
  maxDuration,
  progress,
  animation,
}: {
  maxDuration: number;
  progress: number;
  animation: TAnimation;
}): TStylesState & { animationProgress: number } => {
  const { from, toDelay, to, easing = "linear", onFrame } = animation;
  const startProgress = (toDelay ? toDelay.progress : from.progress) ?? 0;
  const animationProgress = Math.min(getProgress(startProgress, to.progress, progress), 1);
  const isDelay = animationProgress < 0;
  const frame = onFrame
    ? onFrame({ maxDuration, progress, animationProgress, animation })
    : undefined;
  const easingProgress =
    frame?.progress ??
    Easing.router({
      progress: animationProgress,
      easing,
    });

  let x: number | undefined = from.x;
  let y: number | undefined = from.y;
  let opacity: number | undefined = from.opacity;

  if (!isDelay) {
    x = frame?.x ?? getProgressValue(from.x, to.x, easingProgress);
    y = frame?.y ?? getProgressValue(from.y, to.y, easingProgress);
    opacity = frame?.opacity ?? getProgressValue(from.opacity, to.opacity, easingProgress);
  }

  return {
    animationProgress,
    x,
    y,
    opacity,
  };
};

/**
 * 애니메이션 실행기
 */
export const animationsRunner = ({
  startProgress,
  endProgress,
  duration,
  maxDuration,
  animations,
  onFrame,
  onAnimationEnd,
}: {
  /** 시작 진행도(0 ~ 1) */
  startProgress: number;
  /** 종료 진행도(0 ~ 1) */
  endProgress: number;
  /** 실제 애니메이션 실행 시간(ms) */
  duration?: number;
  /** 원래 실행되어야햘 전체 실행 시간(ms) */
  maxDuration: number;
  /** 실행할 애니메이션 */
  animations: TAnimation[];
  /** 애니메이션 종료 시 콜백 */
  onFrame?: Parameters<typeof framer>[0]["onFrame"];
  /** 애니메이션 종료 시 콜백 */
  onAnimationEnd?: Parameters<typeof framer>[0]["onDone"];
}) => {
  const isNormal = startProgress <= endProgress;
  const newStartProgress = isNormal ? startProgress : endProgress;
  const newEndProgress = isNormal ? endProgress : startProgress;
  const diff = newEndProgress - newStartProgress;
  const rangeAnimations = getRangeAnimations({
    startProgress: newStartProgress,
    endProgress: newEndProgress,
    animations,
  });
  const newAnimations = isNormal ? rangeAnimations : rangeAnimations.reverse();
  const newDuration = duration ?? maxDuration;
  let newProgress = 0;

  framer({
    startProgress: newStartProgress,
    endProgress: newEndProgress,
    duration: newDuration,
    onFrame: (data) => {
      const { progress, elapsed } = data;

      newProgress = isNormal
        ? progress
        : Math.max(
            diff * (1 - (progress - newStartProgress) / diff) + newStartProgress,
            newStartProgress,
          );

      // 현재 적용해야할 애니메이션
      const animation = findProgressAnimation({ animations: newAnimations, progress: newProgress });

      if (!animation) {
        throw new Error("not defined animation: " + animation);
      }

      // 스타일
      const styles = getAnimationToStyle({
        maxDuration,
        progress: newProgress,
        animation,
      });

      // 엘리먼트에 스타일 적용
      ApplyStyles.router({
        el: animation.element,
        x: styles.x,
        y: styles.y,
        opacity: styles.opacity,
      });

      if (onFrame) {
        return onFrame({ progress: newProgress, elapsed });
      }
    },
    onDone: ({ elapsed }) => {
      if (onAnimationEnd) {
        onAnimationEnd({ progress: newProgress, elapsed });
      }
    },
  });
  // console.log("> ", animations);
};
