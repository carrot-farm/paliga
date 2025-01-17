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
  TimelineHTMLRef,
  TIntersectionPlayOptions,
  TPlayOptions,
  TScrollProgressOptions,
} from "../../types";
import { DevTool } from "../DevTool";

/** ===== Components ===== */
/** 타임라인 기본 컴포넌트 */
function Timeline<TTag extends HTMLTag = "div">(
  {
    as = "div",
    progress,
    isAutoPlay,
    isIntersectionPlay,
    isScrollProgress,
    isDevTool,
    autoPlayOptions,
    intersectionPlayOptions,
    scrollProgressOptions,
    timeline,
    paligaRef,
    ...args
  }: TimelineProps<TTag>,
  ref: Ref<TimelineHTMLRef | undefined>,
) {
  const paliga = useRef<ClassPaliga>(paligaRef?.current ?? new ClassPaliga());
  const elementRef = useRef<TimelineHTMLRef>();
  const element = React.createElement(as, { ...args, ref: elementRef });
  const [isPlayReady, setIsPlayReady] = useState(false);
  const [isIntersectionPlayReady, setIsIntersectionPlayReady] = useState(false);
  const [isScrollProgressReady, setIsScrollProgressReady] = useState(false);

  // # ref
  useImperativeHandle(ref, () => {
    if (!elementRef.current) {
      return;
    }
    elementRef.current.paliga = paliga.current;

    return elementRef.current;
  }, []);

  // # 기본 타임 라인 셋팅
  useLayoutEffect(() => {
    const Element = elementRef.current;

    if (!timeline || !paliga.current || !Element) {
      return;
    }

    paliga.current.initialize();
    const [first, ...others] = timeline;
    paliga.current.timeline([Element], first);
    others.forEach((t) => {
      paliga.current.timeline(t);
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
    const { root, ...others } = scrollProgressOptions ?? {};

    paliga.current.initializeScrollListeners();
    paliga.current.scrollProgress({ ...others, root: root?.current ?? undefined });
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
      paliga.current.allInitialize();
    };
  }, []);

  return (
    <>
      {element}
      {isDevTool && <DevTool paligaRef={paliga} />}
    </>
  );
}

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
  /** true 일 경우 개발 도구 활성화 */
  isDevTool?: boolean;
  /** auto play 시 옵션 정의 */
  autoPlayOptions?: TPlayOptions;
  /** intersectionPlay 옵션 */
  intersectionPlayOptions?: TIntersectionPlayOptions;
  /** scrollProgress 옵션 */
  scrollProgressOptions?: { root?: MutableRefObject<HTMLElement | null> } & Omit<
    TScrollProgressOptions,
    "root"
  >;
  /** timeline 적용 */
  timeline?: TAnimateOptions[];
  /** paliga instance */
  paligaRef?: MutableRefObject<ClassPaliga>;
} & ComponentPropsWithoutRef<TTag>;

type HTMLTag = keyof HTMLElementTagNameMap;

export default forwardRef(Timeline);
