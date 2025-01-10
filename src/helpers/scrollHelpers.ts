import { TSchedule } from "../types";
import { getDistanceFromTop, getInnerHeight } from "./styleHelpers";

/** 스크롤 트리거의 위치를 반환 */
export const getScrollTriggerY = ({
  scrollTrigger,
  containerEl,
}: {
  scrollTrigger: string | number;
  containerEl?: HTMLElement;
}) => {
  const type = typeof scrollTrigger === "string" && scrollTrigger.endsWith("%") ? "percent" : "px";
  const scrollTriggerNum =
    typeof scrollTrigger === "string" ? parseInt(scrollTrigger, 10) : scrollTrigger;

  if (containerEl) {
    const innerHeight = getInnerHeight(containerEl);
    const result =
      type === "percent" ? Math.round((innerHeight * scrollTriggerNum) / 100) : scrollTriggerNum;
    return result;
  }

  const result =
    type === "percent"
      ? Math.round((window.innerHeight * scrollTriggerNum) / 100)
      : scrollTriggerNum;
  return result;
};

/** 엘리먼트 혹은 window의 scroll y 를 반환  */
export const getScrollY = (el: HTMLElement | Window) =>
  "scrollY" in el ? el.scrollY : "scrollTop" in el ? el.scrollTop : 0;

/** 엘리먼트의 내부 Y 값 반환(padding-top, border 를 제외) */
export const getInnerY = (el: HTMLElement) => {
  const y = getDistanceFromTop(el);
  const styleMap = el.computedStyleMap();
  const pt = parseInt(styleMap.get("padding-top")?.toString() ?? "0", 10);
  const borderWidth = parseInt(styleMap.get("border-width")?.toString() ?? "0", 10);

  // console.log("> ", pt, borderWidth);
  return y + pt + borderWidth;
};

/** 트리거의 상태별 스엘리먼트의 포지션 */
export const elementTriggerPosition = {
  ready: (schedule: TSchedule[], top: number) => {
    schedule.forEach((sequence) => {
      sequence.element.style.position = "";
      sequence.element.style.top = "";
    });
  },
  enter: (schedule: TSchedule[], top: number) => {
    schedule.forEach((sequence) => {
      sequence.element.style.position = "fixed";
      sequence.element.style.top = `${top}px`;
    });
  },
  leave: (schedule: TSchedule[], top: number) => {
    schedule.forEach((sequence) => {
      sequence.element.style.position = "absolute";
      sequence.element.style.top = `${top}px`;
    });
  },
  router({
    state,
    top = 0,
    schedule,
  }: {
    state: "ready" | "enter" | "leave";
    top?: number;
    schedule: TSchedule[];
  }) {
    if (!this[state]) {
      throw new Error("invalid state: " + state);
    }
    return this[state](schedule, top);
  },
};
