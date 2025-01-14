import { CSSProperties } from "react";
import { Paliga } from "./core/Paliga";
import { TScheduleRunnerOnParams } from "./helpers/scheduleHelpers";

/** ==== 메소드 옵션 ==== */
export type TPlayOptions = {
  /** 반복 횟수 */
  iteration?: number;
  /** 지정된 진행도부터 실행 */
  startProgress?: number;
  /** 지정된 진행도까지만 실행 */
  endProgress?: number;
  /** 애니메이션 종료 후 위치(default: "forwards") */
  fillMode?: "none" | "forwards";
  /** 애니메이션 종료 시 콜백 */
  onAnimationEnd?: (data: TScheduleRunnerOnParams) => void;
  /** 모든 애니메이션 종료 시 콜백 */
  onAllAnimationEnd?: (data: { segments?: TSegment[] }) => void;
};

/** animate 함수 호출 시 옵션 */
export type TAnimateOptions = {
  /** 애니메이션 실행 시간 */
  duration?: number;
  /** animate 시 사전 적용될 스타일 */
  beforeStyle?: (index: number) => CSSProperties;
} & Partial<Omit<TTransition, "id" | "groupId" | "duration">>;

export type TAnimate = { elements: HTMLElement[] } & TAnimateOptions;

/** insersection 옵션 */
export type TIntersectionPlayOptions = {
  /** 정의 시 엘리먼트 별로 옵션 지정 가능 */
  eachOptions?: (schedule: TSchedule, index: number) => IntersectionObserverInit;
  /** 교차 시 콜백 */
  onIntersecting?: (params: TIntersectingParams) => void;
  /** 교차 해지 시 콜베백 */
  onUnintersecting?: (params: TIntersectingParams) => void;
  /** 애니메이션 종료 시 콜백 */
  onAnimationEnd?: (data: TIntersectingParams) => void;
} & IntersectionObserverInit;
type TIntersectingParams = {
  index: number;
  schedule: TSchedule;
  entries: IntersectionObserverEntry[];
  observer: IntersectionObserver;
};

/** scrollProgress 파라메터 */
export type TScrollProgressOptions = {
  /** 트리거의 위치.(20%) */
  trigger?: string | number;
  /** 시작 스크롤의 위치 */
  startY?: number;
  /** 종료 스크롤의 위치 */
  endY?: number;
  /** 애니메이션 기간 */
  duration?: number;
  /** true일 경우 엘리먼트를 고정 */
  pin?: boolean;
  /** 스크롤의 기준이 되는 루트 엘리먼트(default: window) */
  root?: HTMLElement;
  /** 트리거가 범위내 히트하지 않았을 경우 */
  onTriggerReady?: (data: { schedule: TSchedule[] }) => void;
  /** 트리거가 start 히트할 경우 */
  onTriggerEnter?: (data: { schedule: TSchedule[] }) => void;
  /** 트리거가 범위를 벗어날 경우 */
  onTriggerLeave?: (data: { schedule: TSchedule[] }) => void;
};

/** 계산된 scrollProgress 정보 */
export type TScrollProgressData = {
  /** 트리거의 위치 */
  triggerY: number;
  /** 시작 위치 */
  startY: number;
  /** 종료 위치 */
  endY: number;
};

/** each 속성 호출 시 전달받는 인자 */
export type TEachState = Pick<
  TTransition,
  | "direction"
  | "easing"
  | "x"
  | "y"
  | "z"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "scaleZ"
  | "rotate"
  | "rotateX"
  | "rotateY"
  | "rotateZ"
  | "width"
  | "height"
  | "borderWidth"
  | "borderColor"
  | "delay"
>;

/** ===== 상태 ===== */
export type TControlType = "play" | "intersectionPlay" | "scrollProgress";

export type TFrameObserver = (
  data: { state: "idle" | "running" | "paused"; progress: number } & Partial<
    Omit<TScheduleRunnerOnParams, "progress">
  >,
) => void;

/** 하나의 엘리먼트에 적용될 애니메이션 정보 */
export type TTransition = {
  /** animate의 인덱스 */
  // animateIndex: number;
  /** 진행방향 */
  direction: TDirection;

  /** easing */
  easing?: TEasing;
  /** 반복 횟수 */
  iteration: number;
  /** 애니메이션 시간(ms) */
  duration: number;
  /** 딜레이 */
  delay?: number;
  /** 엘리먼트 */
  element: HTMLElement;
  /** 엘리먼트별 스타일 적용 */
  each?: (state: TEachState, index: number) => Partial<TEachState>;
  /** 프레임마다 실행 */
  onFrame?: (params: TOnFrameParams) => Partial<{ progress: number } & TStylesState> | void;
} & TStylesState;

/** onFrame 파라메터 */
export type TOnFrameParams = {
  /** 전체 진행도 */
  progress: number;
  /** 현재 구간의 진행도 */
  animationProgress: number;
  /** 전체 진행시간(ms) */
  maxDuration: number;
  /** 현재 실행중인 애니메이션 정보 */
  animation: TAnimation;
};

/** 세그먼트 */
export type TSegment = {
  /** 아이디 */
  id: string;
  /** transitions 의 전체 애니메이션 시간 */
  maxDuration: number;
  /** 적용 엘리먼트 */
  element: HTMLElement;
  /** 애니메이션 */
  transitions: TTransition[];
};

/** 세그먼트 아이디를 기준으로 한 그룹 */
export type TSegmentGroup = {
  id: number;
  totalDuration: number;
  element: HTMLElement;
  transitions: TTransition[];
};

export type TSchedule = {
  /** 애니메이션의 상태 */
  state: "idle" | "running" | "paused" | "done";
  /** 애니메이션의 진행도 */
  progress: number;
  /** 애니메이션 목록 */
  animations: TAnimation[];
} & Omit<TSegment, "transitions">;

export type TAnimation = {
  /** delay + duration */
  // sumDuration: number;
  /** 지연 상태 */
  toDelay?: Pick<TAnimationState, "duration" | "progress">;
  /** 시작 상태  */
  from: TAnimationState;
  /** 종료 상태 */
  to: TAnimationState;
} & Pick<TTransition, "direction" | "duration" | "delay" | "element" | "easing" | "onFrame">;

export type TAnimationState = {
  /** 시작/종료 진행도(0~1) */
  progress: number;
  /** 시작/동료 시간(ms) */
  duration: number;
} & TStylesState;

export type TDirection = "normal" | "reverse" | "alternate";

export type TEasingParams = {
  progress: number;
  easing: TEasing;
};

export type TEasing =
  | [number, number, number, number]
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "easeInBounce"
  | "easeOutBounce";

export type TStylesState = {
  x?: number;
  y?: number;
  z?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  width?: number;
  height?: number;
  opacity?: number;
  borderWidth?: number;
  borderColor?: string | [number, number, number, number];
  backgroundColor?: string | [number, number, number, number];
};

export type TApplyStylesParams = {
  backgroundColor?: [number, number, number, number];
  borderColor?: [number, number, number, number];
  el: HTMLElement;
} & Omit<TStylesState, "backgroundColor" | "borderColor">;

/** ===== ReactComponent ===== */
type HTMLTag = keyof HTMLElementTagNameMap;

export type TimelineHTMLRef<T extends HTMLTag | undefined = undefined> = (T extends HTMLTag
  ? HTMLElementTagNameMap[T]
  : HTMLElement) & {
  paliga: Paliga;
};
