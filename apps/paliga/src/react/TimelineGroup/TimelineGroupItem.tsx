import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTimelineGroup } from "./TimelineGroup";

export const TimelineGroupItem = forwardRef<TItemElement | undefined, TTimelineGroupItemProps>(
  ({ as = "div", ...args }, ref) => {
    const innerRef = useRef<TItemElement<typeof as>>();
    const element = React.createElement(as, { ...args, ref: innerRef });
    const { setElements } = useTimelineGroup();
    const [isReady, setIsReady] = useState(false);

    /** 외부에서 접근 시 ref 제공  */
    useImperativeHandle(ref, () => {
      return innerRef.current;
    }, []);

    /** 마운트 */
    useEffect(() => {
      const Element = innerRef.current;
      if (!Element || isReady) {
        return;
      }

      setElements((prev) => [...prev, Element]);
      setIsReady(true);
    }, [isReady]);

    return <>{element}</>;
  },
);
TimelineGroupItem.displayName = "TimelineGroupItem";

/** ===== Types ===== */
/** Item Props */
export type TTimelineGroupItemProps<T extends HTMLTag = "div"> = {
  /** 생성할 엘리먼트 */
  as?: T;
} & ComponentPropsWithoutRef<T>;

type HTMLTag = keyof HTMLElementTagNameMap;

/** 자식 아이템의 엘리먼트 타입 */
type TItemElement<T extends HTMLTag | undefined = undefined> = T extends HTMLTag
  ? HTMLElementTagNameMap[T]
  : HTMLElement;
