import { CSSProperties } from "react";
import { minMax } from "../helpers/mathHelpers";
import { getSchedule, scheduleRunner } from "../helpers/scheduleHelpers";
import {
  elementTriggerPinPosition,
  getInnerY,
  getScrollTriggerY,
  getScrollY,
} from "../helpers/scrollHelpers";
import { findParent, getDistanceFromTop } from "../helpers/styleHelpers";
import {
  TAnimate,
  TAnimateOptions,
  TControlType,
  TFrameObserver,
  TIntersectionPlayOptions,
  TPlayOptions,
  TSchedule,
  TScrollProgressData,
  TScrollProgressOptions,
  TSegment,
  TTransition,
} from "../types";
import { timeoutFn } from "./timeUtils";

export class Paliga {
  #frameObservers: TFrameObserver[] = [];
  #controlType: TControlType = "play";
  #state: "idle" | "running" | "paused" = "idle";
  #progress: number = 0;
  #totalDuration: number = 0;
  #resumeProgress: number | undefined;
  #animates: TAnimate[] = [];
  #segments: TSegment[] = [];
  #schedule: TSchedule[] = [];
  #scrollLisners: { root: HTMLElement | Window; listener: () => void }[] = [];
  #playOptions: TPlayOptions = {};
  #intersectionPlayOptions: TIntersectionPlayOptions = {};
  #intersectionObservers: IntersectionObserver[] = [];
  #scrollProgressOptions: TScrollProgressOptions = {};
  #scrollProgressData: TScrollProgressData = {
    triggerY: 0,
    startY: 0,
    endY: 0,
  };

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
    const instance = this;

    this.#controlType = "intersectionPlay";
    this.#intersectionPlayOptions = {
      ...options,
      eachOptions,
      onIntersecting,
      onUnintersecting,
      onAnimationEnd,
    };

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

        scheduleRunner({
          startProgress: 0,
          endProgress: 1,
          scheduleList: [schedule],
          onFrame: (data) => {
            // # 옵저버 실행
            if (instance.#frameObservers.length > 0) {
              instance.runFrameObserver({ ...data, state: instance.#state });
            }
          },
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
    pin,
    root,
    onTriggerReady,
    onTriggerEnter,
    onTriggerLeave,
  }: TScrollProgressOptions = {}) {
    this.#controlType = "scrollProgress";
    this.#scrollProgressOptions = {
      trigger,
      startY,
      endY,
      duration,
      pin,
      root,
    };

    if (this.#schedule.length === 0) {
      return;
    }

    const firstEl = this.#schedule[0].element;
    const parent = findParent(firstEl, (el) => getComputedStyle(el).position === "relative");
    const parentOffsetY = parent ? getInnerY(parent) : 0;
    const newRoot = root ?? window;
    const rootInnerY = newRoot instanceof Element ? getInnerY(newRoot) : 0;
    let rootViewportY = root ? root.getBoundingClientRect().y : 0;
    const rootPaddingTop = root ? parseInt(getComputedStyle(root).paddingTop, 10) : 0;
    const scheduleLen = this.#schedule.length;
    const scrollY = getScrollY(newRoot);
    const firstY = getDistanceFromTop(firstEl);
    const baseY = root ? firstY - rootInnerY : firstY;
    const newStartY = baseY + startY;
    const startOffset = startY * -1;
    const newEnd = baseY + endY;
    const newTrigger = getScrollTriggerY({
      scrollTrigger: trigger,
      containerEl: newRoot instanceof Element ? newRoot : undefined,
    });
    const debounce = timeoutFn("debounce");
    const vieportDebounce = timeoutFn("debounce");
    let state = "idle";
    let triggerState: "ready" | "enter" | "leave" | undefined;
    let prevProgress = minMax((scrollY - startY) / (endY - startY), 0, 1);

    this.#scrollProgressData.triggerY = newTrigger;
    this.#scrollProgressData.startY = newStartY;
    this.#scrollProgressData.endY = newEnd;

    // mt 104(64 + 40)
    // console.log("> ", firstY, newTrigger, parentOffsetY);
    // console.log("> 0: ", rootViewportY);
    // return;

    /** 스크롤 실행 시 애니메이션 실행  */
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
          const currentProgress = minMax((newTrigger + currentScrollY - newStartY) / diff, 0, 1);
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
      const newScrollY = getScrollY(newRoot);
      const diff = newEnd - newStartY;
      const triggerY = newScrollY + newTrigger;
      // console.log("> 1: ", newScrollY, triggerY, newStartY);

      // return;

      // # ready
      if (triggerY < newStartY && triggerState !== "ready") {
        triggerState = "ready";
        // console.log("> ready: ");
        if (pin) {
          elementTriggerPinPosition.router({
            state: triggerState,
            schedule: this.#schedule,
          });
        }
        if (onTriggerReady) {
          onTriggerReady({ schedule: this.#schedule });
        }
      }

      // # enter
      if (triggerY >= newStartY && triggerY < newEnd && triggerState !== "enter") {
        triggerState = "enter";
        // console.log("> enter: ", newTrigger);
        if (pin) {
          elementTriggerPinPosition.router({
            state: triggerState,
            top: root ? newTrigger + startOffset + rootViewportY : newTrigger + startOffset,
            schedule: this.#schedule,
          });
        }
        if (onTriggerEnter) {
          onTriggerEnter({ schedule: this.#schedule });
        }
      }

      // # leave
      if (triggerY >= newEnd && triggerState !== "leave") {
        triggerState = "leave";
        // 573 ~ 973, 637 ~ 1037
        // console.log("> leave: ", newEnd, newStartY, baseY);
        if (pin) {
          elementTriggerPinPosition.router({
            state: triggerState,
            top: root
              ? newEnd + startOffset - rootPaddingTop
              : newEnd - parentOffsetY + startOffset,
            schedule: this.#schedule,
          });
        }
        if (onTriggerLeave) {
          onTriggerLeave({ schedule: this.#schedule });
        }
      }

      if (state === "running") {
        return;
      }

      state = "running";

      debounce(() => {
        const progress = minMax((triggerY - newStartY) / diff, 0, 1);
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

    if (root) {
      /** 컨테이너 내에서 스크롤 시 위치를 보정하기 위함 */
      const listenViewportY = () => {
        vieportDebounce(() => {
          rootViewportY = root?.getBoundingClientRect().y ?? 0;
        });
      };
      window.addEventListener("scroll", listenViewportY);
      this.#scrollLisners.push({ root: window, listener: listenViewportY });
    }
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
    this.#playOptions = {};
    this.#intersectionPlayOptions = {};
    this.#scrollProgressOptions = {};
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
    this.initialize();

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
    return this;
  }

  /** 프레임 옵저버 초기화 */
  initializeFrameObservers() {
    this.#frameObservers = [];
    return this;
  }

  /** 스크롤 리스너 초기화 */
  initializeScrollListeners() {
    this.#scrollLisners.forEach(({ root, listener }) => {
      root.removeEventListener("scroll", listener);
    });

    this.#scrollLisners = [];
    return this;
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

  /** intersection play options 반환 */
  getPlayOptions() {
    return { ...this.#playOptions };
  }

  /** intersection play options 반환 */
  getIntersectionPlayOptions() {
    return { ...this.#intersectionPlayOptions };
  }

  /** scrollProgress 의 옵션 */
  getScrollProgressOptions() {
    return { ...(this.#scrollProgressOptions ?? {}) };
  }

  /** scrollProgress 의 데이터 */
  geTScrollProgressData() {
    return { ...this.#scrollProgressData };
  }

  /** animate 옵션 반환 */
  getAnimates() {
    return [...this.#animates];
  }

  /** timeline 셋 */
  setTimeline(timelineOptions: ({ elements?: HTMLElement[] } & Omit<TAnimate, "elements">)[]) {
    this.#animates = [];
    this.#segments = [];
    this.#schedule = [];

    timelineOptions.forEach(({ elements, ...options }) => {
      if (elements) {
        this.timeline(elements, options);
      } else {
        this.timeline(options);
      }
    });
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
}
