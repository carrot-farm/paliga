import { CSSProperties } from "react";
import { getAnimationToStyle } from "../helpers/animationHelpers";
import { getSchedule, scheduleRunner } from "../helpers/scheduleHelpers";
import { getInnerHeight } from "../helpers/styleHelpers";
import {
  TAnimateOptions,
  TFrameObserver,
  TIntersectionPlayOptions,
  TPlayOptions,
  TSchedule,
  TScrollProgressOptions,
  TSegment,
  TTransition,
} from "../types";
import { ApplyStyles } from "./ApplyStyles";
import { framer } from "./framer";
import { timeoutFn } from "./timeUtils";

export class Paliga {
  #frameObservers: TFrameObserver[] = [];
  #controlType: "play" | "intersectionPlay" | "scrollProgress" = "play";
  #state: "idle" | "running" | "paused" = "idle";
  #progress: number = 0;
  #totalDuration: number = 0;
  #resumeProgress: number | undefined;
  #playOptions: TPlayOptions = {};
  #animates: ({ elements: HTMLElement[] } & TAnimateOptions)[] = [];
  #segments: TSegment[] = [];
  #schedule: TSchedule[] = [];
  #scrollLisners: { root: HTMLElement | Window; listener: () => void }[] = [];
  #intersectionObservers: IntersectionObserver[] = [];

  constructor() {}

  /** 연속 실행기 */
  play({
    fillMode = "forwards",
    iteration,
    startProgress = 0,
    endProgress = 1,
    onAnimationEnd,
    onAllAnimationEnd,
  }: TPlayOptions = {}) {
    let newIteration = iteration;
    let instance = this;

    this.#controlType = "play";

    if (instance.#state === "running") {
      return;
    }

    instance.#progress = instance.#resumeProgress ?? startProgress;
    instance.#state = "running";
    instance.#playOptions = {
      fillMode,
      iteration,
      startProgress,
      endProgress,
      onAnimationEnd,
      onAllAnimationEnd,
    };

    const runner = () => {
      scheduleRunner({
        startProgress: instance.#resumeProgress ?? startProgress,
        endProgress,
        scheduleList: this.#schedule,
        onFrame: (data) => {
          instance.#progress = data.progress;

          // # 옵저버 실행
          if (instance.#frameObservers.length > 0) {
            instance.runFrameObserver({ ...data, state: instance.#state });
          }

          if (this.#state === "paused") {
            return false;
          }
        },
        onAnimationEnd: (data) => {
          const { index } = data;

          if (onAnimationEnd) {
            onAnimationEnd(data);
          }

          if (index < this.#schedule.length - 1) {
            return;
          }

          allAnimationEnd();
        },
      });

      instance.#resumeProgress = undefined;
    };

    /** 모든 애니메이션 종료 시 콜백 */
    const allAnimationEnd = () => {
      // # 반복
      if (newIteration !== undefined && newIteration > 1 && this.#state !== "paused") {
        if (newIteration !== Infinity) {
          newIteration--;
        }

        instance.#progress = 0;

        runner();
        return;
      }

      this.#state = "idle";

      if (fillMode === "none") {
        instance.#progress = 0;
        this.progress(instance.#progress);
      }

      if (this.#frameObservers.length > 0) {
        this.runFrameObserver({ progress: instance.#progress, state: instance.#state });
      }

      // # 모든 애니메이션 종료 시 호출
      if (
        typeof onAllAnimationEnd === "function" &&
        (newIteration === undefined || newIteration <= 1)
      ) {
        onAllAnimationEnd({ segments: this.#segments });
      }
    };

    runner();
  }

  /** 교차 시 실행 */
  intersectionPlay({
    eachOptions,
    onIntersecting,
    onUnintersecting,
    onAnimationEnd,
    ...options
  }: TIntersectionPlayOptions = {}) {
    this.#controlType = "intersectionPlay";
    this.#eachSchedule((schedule, i) => {
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
    this.#state = "paused";
    this.#progress = progress;

    scheduleRunner({
      startProgress: progress,
      endProgress: progress,
      scheduleList: this.#schedule,
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
    this.#controlType = "scrollProgress";
    if (this.#schedule.length === 0) {
      return;
    }

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
    const throttle = timeoutFn("throttle");
    let state = "idle";
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

      throttle(() => {
        const newScrollY = getScrollY(newRoot);
        const diff = newEnd - newStartY;
        const progress = limitRange((newTrigger + newScrollY - newStartY) / diff);
        // console.log("> p: ", prevProgress.toFixed(2), progress.toFixed(2));

        scrollRunner({
          startProgress: prevProgress,
          endProgress: progress,
          duration,
          scheduleList: this.#schedule,
        });
      }, 100);
    };

    handleScroll();
    newRoot.addEventListener("scroll", handleScroll);
    this.#scrollLisners.push({ root: newRoot, listener: handleScroll });
  }

  /** 애니메이션 중단 */
  pause() {
    this.#state = "paused";
  }

  /** 중단된 애니메이션 재개 */
  resume() {
    if (this.#state !== "paused") {
      return;
    }
    this.#resumeProgress = this.#progress;
    this.play(this.#playOptions);
  }

  /** 애니메이션의 진행 방향을 변경 */
  reverse() {
    this.#resumeProgress = this.#progress;
    this.play({
      ...this.#playOptions,
      startProgress: this.#playOptions.endProgress,
      endProgress: this.#playOptions.startProgress,
    });
  }

  /** 프레임 감시 */
  observeFrame(f: TFrameObserver) {
    this.#frameObservers.push(f);
  }

  /** 프레임 감시 실행 */
  runFrameObserver(data: Parameters<TFrameObserver>[0]) {
    const len = this.#frameObservers.length;
    let i = 0;

    while (i < len) {
      this.#frameObservers[i](data);
      i++;
    }
  }

  /** 애니메이션 정의 */
  timeline(elements: HTMLElement[], options: TAnimateOptions): Paliga;
  timeline(options: TAnimateOptions): Paliga;
  // eslint-diabled-next-line no-dupe-class-members
  timeline(elements: HTMLElement[] | TAnimateOptions, options?: TAnimateOptions) {
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

    const { beforeStyle, ...otherOptions } = newOptions;

    // # 엘리먼트별 트랜지션 계산
    newElements.forEach((element, i) => {
      const id = element.dataset["traniId"]
        ? Number(element.dataset["traniId"])
        : this.#segments.length;
      let newTransition: TTransition = {
        ...otherOptions,
        // animateIndex: this.#animates.length - 1,
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
      if (beforeStyle) {
        const style = beforeStyle(i);
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
            borderWidth: newTransition.borderWidth,
            borderColor: newTransition.borderColor,
            width: newTransition.width,
            height: newTransition.height,
            scale: newTransition.scale,
            scaleX: newTransition.scaleX,
            scaleY: newTransition.scaleY,
            scaleZ: newTransition.scaleZ,
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

    this.#schedule = getSchedule({
      totalDuration: this.#totalDuration,
      segments: this.#segments,
    });

    // console.log("> ", this.#schedule);

    return this;
  }

  /** 초기화 */
  initialize() {
    this.#totalDuration = 0;
    this.#animates = [];
    this.#segments = [];
    this.#schedule = [];
    return this;
  }

  /** 초기화 */
  allInitialize() {
    this.initializeObservers();
    this.initializeFrameObservers();
    this.initializeScrollListeners();

    this.#totalDuration = 0;
    this.#animates = [];
    this.#segments = [];
    this.#schedule = [];
    return this;
  }

  /** 인터섹션 옵저버 초기화 */
  initializeObservers() {
    this.#schedule.forEach((schedule) => {
      this.#intersectionObservers.forEach((observer) => {
        observer.unobserve(schedule.element);
      });
    });

    this.#intersectionObservers = [];
  }

  /** 프레임 옵저버 초기화 */
  initializeFrameObservers() {
    this.#frameObservers = [];
  }

  /** 스크롤 리스너 초기화 */
  initializeScrollListeners() {
    this.#scrollLisners.forEach(({ root, listener }) => {
      root.removeEventListener("scroll", listener);
    });

    this.#scrollLisners = [];
  }

  /** 스케쥴 반환 */
  getSchedule() {
    return [...this.#schedule];
  }

  /** segment 반환 */
  getSegments() {
    return [...this.#segments];
  }

  /** 스케쥴 반환 */
  getProgress() {
    return this.#progress;
  }

  /** 스케쥴 반환 */
  getState() {
    return this.#state;
  }

  /** 전체 실행시간 반환 */
  getTotalDuration() {
    return this.#totalDuration;
  }

  /** 컨트롤 타입 반환 */
  getControlType() {
    return this.#controlType;
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
}
