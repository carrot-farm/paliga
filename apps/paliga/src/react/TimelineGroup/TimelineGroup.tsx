"use client";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Paliga } from "../../core/Paliga";
import {
  TAnimateOptions,
  TIntersectionPlayOptions,
  TPlayOptions,
  TScrollProgressOptions,
} from "../../types";
import { DevTool } from "../DevTool";
import { TimelineGroupItem } from "./TimelineGroupItem";

/** ===== Components ===== */

/** 그룹 */
function TimelineGroup({
  progress,
  isDevTool,
  isAutoPlay,
  isIntersectionPlay,
  isScrollProgress,
  autoPlayOptions,
  intersectionPlayOptions,
  scrollProgressOptions,
  // timeline: defaultTimeline,
  timeline = [],
  paligaRef: outerPaligaRef,
  children,
}: TimelineGroupProps) {
  const paligaRef = useRef<Paliga>(outerPaligaRef?.current ?? new Paliga());
  const [elements, setElements] = useState<TTimelineGroupContextValue["elements"]>([]);
  const [isPlayReady, setIsPlayReady] = useState(false);
  const [isIntersectionPlayReady, setIsIntersectionPlayReady] = useState(false);
  const [isScrollProgressReady, setIsScrollProgressReady] = useState(false);

  // # 기본 타임 라인, 엘리먼트 셋팅
  useLayoutEffect(() => {
    if (!paligaRef.current || timeline.length === 0 || elements.length === 0) {
      return;
    }

    paligaRef.current.initialize();

    const [first, ...others] = timeline;
    paligaRef.current.timeline(elements, first);

    if (others.length > 0) {
      others.forEach((t) => {
        paligaRef.current.timeline(t);
      });
    }

    if (isAutoPlay && !isPlayReady && elements.length > 0) {
      paligaRef.current.play(autoPlayOptions);
      setIsPlayReady(true);
    }
  }, [isAutoPlay, isPlayReady, autoPlayOptions, timeline, elements]);

  // # intersectingPlay
  useEffect(() => {
    if (
      !paligaRef.current ||
      !isIntersectionPlay ||
      isIntersectionPlayReady ||
      elements.length === 0
    ) {
      return;
    }

    paligaRef.current.initializeObservers();
    paligaRef.current.intersectionPlay(intersectionPlayOptions);
    setIsIntersectionPlayReady(true);
  }, [isIntersectionPlay, isIntersectionPlayReady, intersectionPlayOptions, elements]);

  // # scroll progress
  useEffect(() => {
    if (!paligaRef.current || !isScrollProgress || isScrollProgressReady || elements.length === 0) {
      return;
    }

    paligaRef.current.initializeScrollListeners();
    paligaRef.current.scrollProgress(scrollProgressOptions);
    setIsScrollProgressReady(true);
  }, [isScrollProgress, isScrollProgressReady, scrollProgressOptions, elements]);

  // # progress
  useEffect(() => {
    if (!paligaRef.current || typeof progress !== "number" || elements.length === 0) {
      return;
    }

    paligaRef.current.progress(progress);
  }, [progress, elements]);

  // # unmount
  useEffect(() => {
    return () => {
      paligaRef.current.initialize();
      paligaRef.current.initializeObservers();
      paligaRef.current.initializeScrollListeners();
    };
  }, []);

  return (
    <>
      <TimelineGroupContext.Provider value={{ timeline, elements, setElements }}>
        {children}
      </TimelineGroupContext.Provider>

      {isDevTool && <DevTool paligaRef={paligaRef} />}
    </>
  );
}

/** ===== Others ===== */
/** 컨텍스트 */
const TimelineGroupContext = createContext<TTimelineGroupContextValue | null>(null);

/** hook */
export const useTimelineGroup = () => {
  const context = useContext(TimelineGroupContext);

  if (!context) {
    throw new Error("not defined TimelineGroupContext: " + context);
  }

  return context;
};

/** ===== Types ===== */
export type TimelineGroupProps = {
  /** 지정된 진행도까지 진행 f */
  progress?: number;
  /** true 일 경우 자동 시작 */
  isAutoPlay?: boolean;
  /** true 일 경우 intersection play 시작 */
  isIntersectionPlay?: boolean;
  /** true 일 경우 scrollProgress 시작 */
  isScrollProgress?: boolean;
  /** true 일 경우 개발툴 활성화 */
  isDevTool?: boolean;
  /** auto play 시 옵션 정의 */
  autoPlayOptions?: TPlayOptions;
  /** intersectionPlay 옵션 */
  intersectionPlayOptions?: TIntersectionPlayOptions;
  /** scrollProgress 옵션 */
  scrollProgressOptions?: TScrollProgressOptions;
  /** timeline 적용 */
  timeline?: TAnimateOptions[];
  /** paliga instance */
  paligaRef?: MutableRefObject<Paliga>;
  /** children */
  children?: ReactNode;
};

/** 타임라인 그룹의 컨텍스트 */
type TTimelineGroupContextValue = {
  /** timeline 적용 */
  timeline: TAnimateOptions[];
  /** 자식 엘리먼트 목록 */
  elements: HTMLElement[];
  /** 엘리먼트 셋팅 */
  setElements: React.Dispatch<React.SetStateAction<HTMLElement[]>>;
};

TimelineGroup.Item = TimelineGroupItem;

export default TimelineGroup;
