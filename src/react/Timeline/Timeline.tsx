"use client";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  MutableRefObject,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Paliga as ClassPaliga } from "../../core/Paliga";
import {
  TAnimateOptions,
  TIntersectionPlayOptions,
  TPlayOptions,
  TScrollProgressOptions,
} from "../../types";

/** ===== Components ===== */
/** 타임라인 기본 컴포넌트 */
function Timeline<TTag extends HTMLTag = "div">(
  {
    as = "div",
    progress,
    isAutoPlay,
    isIntersectionPlay,
    isScrollProgress,
    autoPlayOptions,
    intersectionPlayOptions,
    scrollProgressOptions,
    timeline,
    paligaRef,
    ...args
  }: TimelineProps<TTag>,
  ref: Ref<TimelineRef | undefined>,
) {
  const paliga = useRef<ClassPaliga>(paligaRef?.current ?? new ClassPaliga());
  const innerRef = useRef<TimelineRef>();
  const element = React.createElement(as, { ...args, ref: innerRef });
  const [isPlayReady, setIsPlayReady] = useState(false);
  const [isIntersectionPlayReady, setIsIntersectionPlayReady] = useState(false);
  const [isScrollProgressReady, setIsScrollProgressReady] = useState(false);

  // # ref
  useImperativeHandle(ref, () => {
    if (!innerRef.current) {
      return;
    }
    innerRef.current.paliga = paliga.current;

    return innerRef.current;
  }, []);

  // # 기본 타임 라인 셋팅
  useLayoutEffect(() => {
    const Element = innerRef.current;

    if (!timeline || !paliga.current || !Element) {
      return;
    }

    paliga.current.initialize();
    timeline.forEach((t) => {
      paliga.current.timeline([Element], t);
    });

    if (isAutoPlay && !isPlayReady) {
      paliga.current.play(autoPlayOptions);
      setIsPlayReady(true);
    }
  }, [timeline, isAutoPlay, isPlayReady, autoPlayOptions]);

  // # intersectingPlay
  useEffect(() => {
    if (!paliga.current || !isIntersectionPlay || isIntersectionPlayReady) {
      return;
    }

    paliga.current.initializeObservers();
    paliga.current.intersectionPlay(intersectionPlayOptions);
    setIsIntersectionPlayReady(true);
  }, [isIntersectionPlay, isIntersectionPlayReady, intersectionPlayOptions]);

  // # scroll progress
  useEffect(() => {
    if (!paliga.current || !isScrollProgress || isScrollProgressReady) {
      return;
    }

    paliga.current.initializeScrollListeners();
    paliga.current.scrollProgress(scrollProgressOptions);
    setIsScrollProgressReady(true);
  }, [isScrollProgress, isScrollProgressReady, scrollProgressOptions]);

  // # progress
  useEffect(() => {
    if (!paliga.current || typeof progress !== "number") {
      return;
    }
    paliga.current.progress(progress);
  }, [progress]);

  // # unmount
  useEffect(() => {
    return () => {
      paliga.current.initialize();
      paliga.current.initializeObservers();
      paliga.current.initializeScrollListeners();
    };
  }, []);

  return <>{element}</>;
}

/** 자식 컴포넌트 */
// const Item = forwardRef<HTMLElement, any>(({ as = "div", ...args }, ref) => {
//   const element = React.createElement(as, { ...args, ref });
//   return <>{element}</>;
// });
// Item.displayName = "Item";

/** ===== Others ===== */

/** ===== Types ===== */
export type TimelineProps<TTag extends HTMLTag> = {
  /** 엘리먼트 지정 */
  as?: HTMLTag;
  /** 지정된 진행도까지 진행 */
  progress?: number;
  /** true 일 경우 자동 시작 */
  isAutoPlay?: boolean;
  /** true 일 경우 intersection play 시작 */
  isIntersectionPlay?: boolean;
  /** true 일 경우 scrollProgress 시작 */
  isScrollProgress?: boolean;
  /** auto play 시 옵션 정의 */
  autoPlayOptions?: TPlayOptions;
  /** intersectionPlay 옵션 */
  intersectionPlayOptions?: TIntersectionPlayOptions;
  /** scrollProgress 옵션 */
  scrollProgressOptions?: TScrollProgressOptions;
  /** timeline 적용 */
  timeline?: TAnimateOptions[];
  /** paliga instance */
  paligaRef?: MutableRefObject<ClassPaliga>;
} & ComponentPropsWithoutRef<TTag>;

export type TimelineRef<T extends HTMLTag | undefined = undefined> = (T extends HTMLTag
  ? HTMLElementTagNameMap[T]
  : HTMLElement) & {
  paliga: ClassPaliga;
};

type HTMLTag = keyof HTMLElementTagNameMap;

export default forwardRef(Timeline);

// const Wrapper = forwardRef(Timeline) as React.ForwardRefExoticComponent<
//   TimelineProps<keyof HTMLElementTagNameMap> & React.RefAttributes<TimelineRef | undefined>
// > & { Item: typeof Item };

// Wrapper.Item = Item;

// export default Wrapper;
