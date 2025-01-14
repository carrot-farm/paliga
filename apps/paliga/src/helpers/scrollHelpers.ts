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
  let containerHeight = containerEl ? getInnerHeight(containerEl) : window.innerHeight;

  const result =
    type === "percent" ? Math.round((containerHeight * scrollTriggerNum) / 100) : scrollTriggerNum;
  return result;
};

/** 엘리먼트 혹은 window의 scroll y 를 반환  */
export const getScrollY = (el: HTMLElement | Window) =>
  "scrollY" in el ? el.scrollY : "scrollTop" in el ? el.scrollTop : 0;

/** 엘리먼트의 내부 Y 값 반환 */
export const getInnerY = (el: HTMLElement) => {
  const y = getDistanceFromTop(el);
  const { paddingTop, borderWidth } = window.getComputedStyle(el);
  const pt = parseInt(paddingTop, 10);
  const newBorderWidth = parseInt(borderWidth, 10);

  return y + pt + newBorderWidth;
};

/** 트리거의 상태별 스엘리먼트의 포지션 */
export const elementTriggerPinPosition = {
  ready: (schedule: TSchedule[]) => {
    schedule.forEach(({ element }) => {
      element.style.position = "";
      element.style.top = "";
    });
  },
  enter: (schedule: TSchedule[], top: number) => {
    schedule.forEach(({ element }) => {
      element.style.position = "fixed";
      element.style.top = `${top}px`;
    });
  },
  leave: (schedule: TSchedule[], top: number) => {
    schedule.forEach(({ element }) => {
      element.style.position = "absolute";
      element.style.top = `${top}px`;
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
