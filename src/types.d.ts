import { CSSProperties } from "react";

/** ==== 메소드 옵션 ==== */
export type TPlayOptions = {
  /** 반복 횟수 */
  iteration?: number;
  /** 모든 애니메이션 종료 시 콜백 */
  onAllAnimationEnd?: (data: { segments?: TSegment[] }) => void;
};

/** animate 함수 호출 시 옵션 */
export type TAnimateOptions = { style?: CSSProperties } & Pick<TTransition, "duration"> &
  Partial<Omit<TTransition, "id" | "groupId" | "duration">>;

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
  /** 스크롤의 기준이 되는 루트 엘리먼트(default: window) */
  root?: HTMLElement;
};

/** each 속성 호출 시 전달받는 인자 */
export type TEachState = Pick<TTransition, "direction" | "easing" | "x" | "y" | "delay">;

/** ===== 상태 ===== */

/** 하나의 엘리먼트에 적용될 애니메이션 정보 */
export type TTransition = {
  /** animate의 인덱스 */
  animateIndex: number;
  /** 진행방향 */
  direction: TDirection;
  /** 애니메이션 적용 형태 */
  // fillMode?: "none" | "forwards";
  /** easing */
  easing?: TEasing;
  /** 적용한 animate의 인덱스 */
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
  onFrame?: (params: TOnFrameParams) => Partial<{ progress: number } & TStylesState> | undefined;
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
  sumDuration: number;
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
  opacity?: number;
};

export type TApplyStylesParams = { el: HTMLElement } & TStylesState;
