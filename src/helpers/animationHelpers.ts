import { ApplyStyles } from "../core/ApplyStyles";
import { Easing } from "../core/Easing";
import { framer } from "../core/framer";
import { TAnimation, TAnimationState, TStylesState } from "../types";
import { getProgress, getProgressValue } from "./progressHelpers";
import { convertToRgbaNumbers } from "./styleHelpers";

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
}): {
  animationProgress: number;
  backgroundColor: Exclude<TStylesState["backgroundColor"], string>;
} & Omit<TStylesState, "backgroundColor"> => {
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
  let z: number | undefined = from.z;
  let opacity: number | undefined = from.opacity;
  let scale: TAnimationState["scale"] = from.scale;
  let rotateX: TAnimationState["rotateX"] = from.rotateX;
  let rotateY: TAnimationState["rotateY"] = from.rotateY;
  let rotateZ: TAnimationState["rotateZ"] = from.rotateZ;
  let backgroundColor: Exclude<TAnimationState["backgroundColor"], string> = Array.isArray(
    from.backgroundColor,
  )
    ? from.backgroundColor
    : undefined;
  const toBackgroundColor = Array.isArray(to.backgroundColor) ? to.backgroundColor : undefined;
  const frameBackground =
    typeof frame?.backgroundColor === "string"
      ? convertToRgbaNumbers(frame.backgroundColor)
      : Array.isArray(frame?.backgroundColor)
        ? frame.backgroundColor
        : undefined;

  if (!isDelay) {
    x = frame?.x ?? getProgressValue(from.x, to.x, easingProgress);
    y = frame?.y ?? getProgressValue(from.y, to.y, easingProgress);
    z = frame?.z ?? getProgressValue(from.z, to.z, easingProgress);
    opacity = frame?.opacity ?? getProgressValue(from.opacity, to.opacity, easingProgress);
    rotateX = frame?.rotateX ?? getProgressValue(from.rotateX, to.rotateX, easingProgress);
    rotateY = frame?.rotateY ?? getProgressValue(from.rotateY, to.rotateY, easingProgress);
    rotateZ = frame?.rotateZ ?? getProgressValue(from.rotateZ, to.rotateZ, easingProgress);
    scale =
      frame?.scale ??
      (from.scale || to.scale
        ? [
            getProgressValue(from.scale?.[0], to.scale?.[0], easingProgress) ?? 1,
            getProgressValue(from.scale?.[1], to.scale?.[1], easingProgress) ?? 1,
            getProgressValue(from.scale?.[2], to.scale?.[2], easingProgress) ?? 1,
          ]
        : undefined);

    backgroundColor =
      frameBackground ??
      (backgroundColor || toBackgroundColor
        ? [
            getProgressValue(backgroundColor?.[0], toBackgroundColor?.[0], easingProgress) ?? 0,
            getProgressValue(backgroundColor?.[1], toBackgroundColor?.[1], easingProgress) ?? 0,
            getProgressValue(backgroundColor?.[2], toBackgroundColor?.[2], easingProgress) ?? 0,
            getProgressValue(backgroundColor?.[3], toBackgroundColor?.[3], easingProgress) ?? 0,
          ]
        : undefined);
  }

  return {
    animationProgress,
    x,
    y,
    z,
    opacity,
    scale,
    rotateX,
    rotateY,
    rotateZ,
    backgroundColor,
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

      // console.log("> ", styles);

      // 엘리먼트에 스타일 적용
      ApplyStyles.router({
        el: animation.element,
        x: styles.x,
        y: styles.y,
        z: styles.z,
        opacity: styles.opacity,
        scale: styles.scale,
        rotateX: styles.rotateX,
        rotateY: styles.rotateY,
        rotateZ: styles.rotateZ,
        backgroundColor: styles.backgroundColor,
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
