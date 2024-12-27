import { CSSProperties } from "react";
import { animationsRunner, getAnimationToStyle } from "../helpers/animationHelpers";
import { scheduleRunner } from "../helpers/scheduleHelpers";
import { getInnerHeight } from "../helpers/styleHelpers";
import {
  TAnimateOptions,
  TAnimation,
  TAnimationState,
  TIntersectionPlayOptions,
  TPlayOptions,
  TSchedule,
  TScrollProgressOptions,
  TSegment,
  TTransition,
} from "../types";
import { ApplyStyles } from "./ApplyStyles";
import { framer } from "./framer";
import { throttle } from "./timeUtils";

export class Paliga {
  #state: "idle" | "running" | "paused" = "idle";
  #totalDuration: number = 0;
  #animates: ({ elements: HTMLElement[] } & TAnimateOptions)[] = [];
  #segments: TSegment[] = [];
  #schedule: TSchedule[] = [];
  #scrollLisners: (() => void)[] = [];
  #intersectionObservers: IntersectionObserver[] = [];

  constructor() {
    this.initialize();
  }

  /** 연속 실행기 */
  play({ iteration, onAllAnimationEnd }: TPlayOptions = {}) {
    let newIteration = iteration;

    if (this.#state === "running") {
      return;
    }
    this.#state = "running";

    /** 모든 애니메이션 종료 시 콜백 */
    const handleAllAnimationEnd: TPlayOptions["onAllAnimationEnd"] = ({ segments }) => {
      // # 반복
      if (newIteration !== undefined && newIteration > 1 && this.#state !== "paused") {
        if (newIteration !== Infinity) {
          newIteration--;
        }

        this.#runner({
          schedules: this.#schedule,
          onAllAnimationEnd: handleAllAnimationEnd,
        });
        return;
      }

      this.#state = "idle";

      // # 모든 애니메이션 종료 시 호출
      if (
        typeof onAllAnimationEnd === "function" &&
        (newIteration === undefined || newIteration <= 1)
      ) {
        onAllAnimationEnd({ segments: segments ? [...segments] : segments });
      }
    };

    // 실행
    this.#runner({
      schedules: this.#schedule,
      onAllAnimationEnd: handleAllAnimationEnd,
    });
  }

  /** 교차 시 실행 */
  intersectionPlay({
    eachOptions,
    onIntersecting,
    onUnintersecting,
    onAnimationEnd,
    ...options
  }: TIntersectionPlayOptions = {}) {
    this.#eachSchedule((schedule, i) => {
      this.#intersectionObservers.forEach((observer) => {
        observer.unobserve(schedule.element);
      });
      this.#intersectionObservers = [];

      const { element } = schedule;
      const newOption = typeof eachOptions === "function" ? eachOptions(schedule, i) : options;
      const newObserver = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;

        if (entry.isIntersecting === false) {
          if (typeof onUnintersecting === "function") {
            onUnintersecting({ index: i, schedule, entries, observer });
          }
          return;
        }

        this.#scheduleRunner({
          schedule,
          onAnimationEnd: () => {
            if (typeof onAnimationEnd === "function") {
              onAnimationEnd({ index: i, schedule, entries, observer });
            }
          },
        });

        if (typeof onIntersecting === "function") {
          onIntersecting({ index: i, schedule, entries, observer });
        }

        newObserver.unobserve(element);
      }, newOption);

      newObserver.observe(element);
      this.#intersectionObservers.push(newObserver);
    });
  }

  /** progress 에 따른 스타일 적용 */
  progress(progress: number) {
    this.#eachSchedule((schedule) => {
      this.#scheduleProgress({
        startProgress: progress,
        schedule,
      });
    });
  }

  /** 스크롤의 진행에 따라 애니메이션 */
  scrollProgress({
    trigger = 0,
    startY = 0,
    endY = 0,
    duration = 300,
    root,
  }: TScrollProgressOptions = {}) {
    const getScrollY = (el: HTMLElement | Window) =>
      "scrollY" in el ? el.scrollY : "scrollTop" in el ? el.scrollTop : 0;
    const limitRange = (num: number) => Math.max(Math.min(num, 1), 0);
    const newRoot = root ?? window;
    const scrollY = getScrollY(newRoot);
    const scheduleLen = this.#schedule.length;
    const { y: rootY } =
      "getBoundingClientRect" in newRoot ? newRoot.getBoundingClientRect() : { y: 0 };
    const rootBorderWidth =
      newRoot instanceof Element
        ? parseInt(newRoot.computedStyleMap().get("border-width")?.toString() ?? "0", 10)
        : 0;
    const rootPaddingTop =
      newRoot instanceof Element
        ? parseInt(newRoot.computedStyleMap().get("padding-top")?.toString() ?? "0", 10)
        : 0;
    const { y: firstY } = this.#schedule[0].animations[0].element.getBoundingClientRect();
    const baseY = firstY - rootY - rootBorderWidth - rootPaddingTop;
    const newStartY = baseY + startY;
    const newEnd = baseY + endY;
    const rootInnerHeight =
      newRoot instanceof Element ? getInnerHeight(newRoot) : newRoot.innerHeight;
    const newTrigger =
      typeof trigger === "string"
        ? Math.round((rootInnerHeight * parseInt(trigger, 10)) / 100)
        : trigger;
    let state = "idle";
    let i = 0;
    let prevProgress = limitRange((scrollY - startY) / (endY - startY));

    /** 스크롤 실행 시 애니메이션 실행 */
    const scrollRunner = ({
      startProgress,
      endProgress,
      duration,
      scheduleList,
      onAnimationEnd,
    }: Pick<
      Parameters<typeof scheduleRunner>[0],
      "startProgress" | "endProgress" | "duration" | "scheduleList" | "onAnimationEnd"
    >) => {
      scheduleRunner({
        startProgress,
        endProgress,
        duration,
        scheduleList,
        onAnimationEnd: (data) => {
          const { index } = data;
          const diff = newEnd - newStartY;

          if (index < scheduleLen - 1) {
            return;
          }
          // console.log("> ", index, scheduleLen);

          const currentScrollY = getScrollY(newRoot);
          const currentProgress = limitRange((newTrigger + currentScrollY - newStartY) / diff);
          prevProgress = endProgress;

          if (endProgress !== currentProgress) {
            scrollRunner({
              startProgress: endProgress,
              endProgress: currentProgress,
              duration,
              scheduleList,
              onAnimationEnd,
            });
            return;
          }

          state = "idle";
          if (onAnimationEnd) {
            onAnimationEnd(data);
          }
        },
      });
    };

    /** 스크롤 이벤트 */
    const handleScroll = () => {
      if (state === "running") {
        return;
      }

      state = "running";
      i = 0;

      throttle(() => {
        const scrollY = getScrollY(newRoot);
        const diff = newEnd - newStartY;
        const progress = limitRange((newTrigger + scrollY - newStartY) / diff);
        console.log("> p: ", prevProgress.toFixed(2), progress.toFixed(2));

        scrollRunner({
          startProgress: prevProgress,
          endProgress: progress,
          duration,
          scheduleList: this.#schedule,
        });
      }, 100);
    };

    handleScroll();
    this.#scrollLisners.push(handleScroll);
    newRoot.addEventListener("scroll", handleScroll);
  }

  /** 애니메이션 중단 */
  pause() {
    this.#state = "paused";

    this.#eachSchedule((schedule) => {
      schedule.state = "paused";
    });
  }

  /** 애니메이션 정의 */
  animate(elements: HTMLElement[], options: TAnimateOptions): Paliga;
  animate(options: TAnimateOptions): Paliga;
  // eslint-diabled-next-line no-dupe-class-members
  animate(elements: HTMLElement[] | TAnimateOptions, options?: TAnimateOptions) {
    const newOptions = options ?? elements;
    let newElements: HTMLElement[];

    if (!newOptions || Array.isArray(newOptions)) {
      throw new Error("invalid options: " + newOptions);
    }
    const segmentLen = this.#animates?.length ?? 0;
    const prevSegment = this.#animates[segmentLen - 1];

    // # 엘리먼트 셋팅
    if (Array.isArray(elements)) {
      newElements = elements;
    } else {
      const prevElements = prevSegment?.elements;

      if (!prevElements) {
        throw new Error("not found prevElements: " + prevElements);
      }

      newElements = prevElements;
    }

    // 애미메이션 저장
    this.#animates.push({
      ...newOptions,
      elements: newElements,
    });

    const { style, ...otherOptions } = newOptions;

    // # 엘리먼트별 트랜지션 계산
    newElements.forEach((element, i) => {
      const id = element.dataset["traniId"]
        ? Number(element.dataset["traniId"])
        : this.#segments.length;
      let newTransition: TTransition = {
        ...otherOptions,
        animateIndex: this.#animates.length - 1,
        element,
        easing: otherOptions.easing ?? "linear",
        direction: otherOptions.direction ?? "normal",
        duration: otherOptions.duration ?? 1000,
        iteration: otherOptions.iteration ?? 1,
        delay: otherOptions.delay ?? 0,
      };

      // 엘리먼트에 아이디 셋팅
      element.dataset["traniId"] = String(id);

      // # 엘리먼트에 스타일 적용
      if (style) {
        let k: keyof CSSProperties;
        for (k in style) {
          const newK = k as unknown as number;
          const value = style[k];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          element.style[newK] = value as unknown as any;
        }
      }

      // # each 적용
      if (typeof newTransition.each === "function") {
        const newState = newTransition.each(
          {
            direction: newTransition.direction,
            easing: newTransition.easing,
            x: newTransition.x,
            y: newTransition.y,
            delay: newTransition.delay,
          },
          i,
        );

        newTransition = { ...newTransition, ...newState };
      }

      // # alerate
      const directionTransitions: TTransition[] =
        newTransition.direction === "alternate"
          ? [
              { ...newTransition, direction: "normal" },
              { ...newTransition, direction: "reverse" },
            ]
          : [{ ...newTransition }];

      // # iterate
      const iterTransitions: TTransition[] = [];
      const newIteration = otherOptions.iteration ?? 1;
      for (let i = 0; i < newIteration; i++) {
        iterTransitions.push(...directionTransitions);
      }

      // 현재 생성된 합산 시간
      const sumDuration = iterTransitions.reduce(
        (acc, cur) => acc + cur.duration + (cur.delay ?? 0),
        0,
      );

      // # 세그먼트 생성 및 추가
      if (!this.#segments[id]) {
        this.#segments[id] = {
          id: `${id}`,
          maxDuration: sumDuration,
          element,
          transitions: iterTransitions,
        };
      } else {
        this.#segments[id].maxDuration += sumDuration;
        this.#segments[id].transitions.push(...iterTransitions);
      }

      this.#totalDuration = Math.max(this.#segments[id].maxDuration, this.#totalDuration);
    }, []);

    this.#schedule = this.#toSchedule({
      totalDuration: this.#totalDuration,
      segments: this.#segments,
    });

    // console.log("> animate: ", this.#segments, this.#schedule);

    return this;
  }

  /** 초기화 */
  initialize() {
    // # intersection observer 이벤트 해제
    this.#schedule.forEach((schedule) => {
      this.#intersectionObservers.forEach((observer) => {
        observer.unobserve(schedule.element);
      });
    });

    // # 스크롤 이벤트 이벤트 해제
    this.#scrollLisners.forEach((listener) => {
      window.removeEventListener("scroll", listener);
    });

    this.#totalDuration = 0;
    this.#animates = [];
    this.#segments = [];
    this.#schedule = [];
    this.#scrollLisners = [];
    this.#intersectionObservers = [];

    return this;
  }

  /** 스케쥴을 생성 */
  #toSchedule({
    totalDuration,
    segments,
  }: {
    totalDuration: number;
    segments: TSegment[];
  }): TSchedule[] {
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
        const sumDuration = transition.duration + curDelay;

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
        const to: TAnimationState = {
          duration: toDuration,
          progress: toDuration / totalDuration,
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
          opacity:
            to.opacity === undefined && from.opacity !== undefined ? from.opacity : to.opacity,
        };

        // 스케쥴
        const newAnimation: TAnimation = {
          sumDuration,
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
  }

  /** 지정된 스케쥴을 progress에 따른 애니메이션 적용 */
  #scheduleProgress({
    startProgress = 0,
    endProgress = startProgress,
    duration,
    schedule,
    onAnimationEnd,
  }: {
    startProgress: number;
    endProgress?: number;
    duration?: number;
    schedule: TSchedule;
    onAnimationEnd?: (params: { progress: number }) => void;
  }) {
    const { maxDuration, animations, element } = schedule;
    const elapsed = maxDuration * startProgress;
    const len = animations.length;
    let i = 0;
    let accDuration = 0;
    let animationIndex = 0;

    // # 애니메이션 인덱스 찾기
    while (i < len) {
      const animation = animations[i];

      accDuration += animation.sumDuration;

      if (accDuration >= elapsed) {
        animationIndex = i;
        break;
      }
      i++;
    }

    animationsRunner({
      startProgress,
      endProgress,
      duration,
      maxDuration,
      animations,
      onAnimationEnd,
    });

    // const filteredAnimations = rangeAnimations({ startProgress, endProgress, animations });
    // const animation = filteredAnimations.shift();
    // console.log("> ", maxDuration);

    // const animation = animations[animationIndex];
    // const isNormal = startProgress < endProgress;
    // const newStartProgress = isNormal ? startProgress : endProgress;
    // const newEndProgress = isNormal ? endProgress : startProgress;
    // const diff = newEndProgress - newStartProgress;

    // framer({
    //   duration: duration ?? animation.duration,
    //   startProgress: newStartProgress,
    //   endProgress: newEndProgress,
    //   onFrame: ({ progress }) => {
    //     const newProgress =
    //       isNormal || diff === 0
    //         ? progress
    //         : Math.max(
    //             diff * (1 - (progress - newStartProgress) / diff) + newStartProgress,
    //             newStartProgress,
    //           );

    //     const styles = getAnimationToStyle({
    //       maxDuration,
    //       progress: newProgress,
    //       animation,
    //     });
    //     const { x, y, opacity } = styles;

    //     ApplyStyles.router({ el: element, x, y, opacity });
    //   },
    //   onDone: (data) => {
    //     if (typeof onAnimationEnd === "function") {
    //       onAnimationEnd(data);
    //     }
    //   },
    // });
  }

  /** 전체 progress 를 기준으로 지정된 animation 스타일 정보를 반환  */
  // #progressAnimationStyle({
  //   maxDuration,
  //   progress,
  //   animation,
  // }: {
  //   maxDuration: number;
  //   progress: number;
  //   animation: TAnimation;
  // }): TStylesState & { animationProgress: number } {
  //   const { from, toDelay, to, easing = "linear", onFrame } = animation;
  //   const startProgress = (toDelay ? toDelay.progress : from.progress) ?? 0;
  //   const animationProgress = Math.min(this.#calcProgress(progress, startProgress, to.progress), 1);
  //   const isDelay = animationProgress < 0;
  //   const frame = onFrame
  //     ? onFrame({ maxDuration, progress, animationProgress, animation })
  //     : undefined;
  //   const easingProgress =
  //     frame?.progress ??
  //     Easing.router({
  //       progress: animationProgress,
  //       easing,
  //     });

  //   let x: number | undefined = from.x;
  //   let y: number | undefined = from.y;
  //   let opacity: number | undefined = from.opacity;

  //   if (!isDelay) {
  //     x = frame?.x ?? this.#calcValue(from.x, to.x, easingProgress);
  //     y = frame?.y ?? this.#calcValue(from.y, to.y, easingProgress);
  //     opacity = frame?.opacity ?? this.#calcValue(from.opacity, to.opacity, easingProgress);
  //   }

  //   return {
  //     animationProgress,
  //     x,
  //     y,
  //     opacity,
  //   };
  // }

  /** 지정된 구간의 진행도를 반환 */
  // #calcProgress = (progress: number, startProgress: number, endProgress: number) => {
  //   return (progress - startProgress) / (endProgress - startProgress);
  // };

  /** progres에 따른 값을 계산 */
  #calcValue(fromValue?: number, value?: number, progress: number = 0, isReverse = false) {
    if (value === undefined && fromValue === undefined) {
      return;
    }
    if (fromValue !== undefined && value === undefined) {
      return fromValue;
    }
    if (fromValue === value) {
      return value;
    }

    const newFromValue = fromValue ?? 0;
    const newValue = value ?? 0;

    if (isReverse) {
      return (newValue - newFromValue) * -progress + newFromValue;
    }

    return (newValue - newFromValue) * progress + newFromValue;
  }

  /** 스케쥴 엘리먼트 순회 */
  #eachSchedule(f: (schedule: TSchedule, index: number) => void) {
    const len = this.#schedule.length;
    let i = 0;

    while (i < len) {
      const schedule = this.#schedule[i];
      f(schedule, i);
      i++;
    }
  }

  /** 단일 스케쥴 실행기 */
  #scheduleRunner({
    startProgress = 0,
    endProgress,
    schedule,
    onAnimationEnd,
  }: {
    startProgress?: number;
    endProgress?: number;
    schedule: TSchedule;
    onAnimationEnd: (data: { schedule: TSchedule }) => void;
  }) {
    const { maxDuration, animations, element } = schedule;
    let k = 0;

    framer({
      startProgress,
      endProgress,
      duration: maxDuration,
      onFrame: ({ progress }) => {
        const animation = animations[k];

        if (!animation) {
          return;
        }

        const { animationProgress, x, y, opacity } = getAnimationToStyle({
          maxDuration,
          progress,
          animation,
        });

        ApplyStyles.router({ el: element, x, y, opacity });

        schedule.progress = progress;

        if (schedule.state === "paused") {
          return false;
        }

        // # 다음 스케쥴
        if (animationProgress >= 1) {
          k++;
        }
      },
      onDone: () => {
        schedule.state = "done";
        schedule.progress = 0;

        if (typeof onAnimationEnd === "function") {
          onAnimationEnd({ schedule });
        }
      },
    });
  }

  /** 전체 스케쥴 실행기 */
  #runner({
    schedules,
    onAllAnimationEnd,
  }: { schedules: TSchedule[] } & Pick<TPlayOptions, "onAllAnimationEnd">) {
    const len = schedules.length;
    let i = 0;
    let doneCount = 0;

    // console.log("> runner: ", this.#schedule);

    while (i < len) {
      const schedule = schedules[i] ?? {};

      if (schedule.state === "running") {
        return;
      }

      // # 일시 중지가 아닐경우는 초기화
      if (schedule.state !== "paused") {
        schedule.progress = 0;
      }

      schedule.state = "running";

      this.#scheduleRunner({
        startProgress: schedule.progress,
        schedule,
        onAnimationEnd: () => {
          ++doneCount;

          if (typeof onAllAnimationEnd === "function" && doneCount === len) {
            onAllAnimationEnd({ segments: this.#segments });
          }
        },
      });

      i++;
    }
  }
}
