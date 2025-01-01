"use client";
import { cn, Link } from "@nextui-org/react";
import {
  forwardRef,
  MutableRefObject,
  ReactNode,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Paliga } from "../../../../../../core/Paliga";
import TestSectionController from "./TestSectionController";

/** ===== Components ===== */
/** 기본 테스트 */
function TestSection({
  title,
  titleLink,
  description,
  className,
  defaultProgress,
  scrollTrigger,
  scrollStart,
  scrollEnd,
  hideController,
  disableInitialized,
  classNames,
  paligaRef: outerPaligaRef,
  children,
  containerRef,
  scrollTargetEl,
  onPlay,
  onPause,
  onReady,
}: TestSectionProps) {
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const paligaRef = useRef<Paliga>(outerPaligaRef?.current ?? new Paliga());
  const [isReady, setIsReady] = useState(false);
  const [newScrollStart, setNewScrollStart] = useState<number>();
  const [newScrollEnd, setNewScrollEnd] = useState<number>();
  const [newScrollTrigger, setNewScrollTrigger] = useState<number>();

  // # onReady
  useEffect(() => {
    if (!disableInitialized) {
      paligaRef.current.allInitialize();
    }
    setIsReady(true);

    if (!onReady) {
      return;
    }

    onReady({ paliga: paligaRef.current });
  }, [disableInitialized]);

  // # 스크롤 트리거
  useEffect(() => {
    if (!innerContainerRef.current || !scrollTrigger || !containerRef?.current) {
      return;
    }
    const { height } = containerRef.current.getBoundingClientRect();
    const pt = parseInt(
      containerRef.current.computedStyleMap().get("padding-top")?.toString() ?? "0",
      10,
    );
    const pb = parseInt(
      containerRef.current.computedStyleMap().get("padding-bottom")?.toString() ?? "0",
      10,
    );
    const borderWidth = parseInt(
      containerRef.current.computedStyleMap().get("border-width")?.toString() ?? "0",
      10,
    );
    const innerHeight = height - pt - pb - borderWidth * 2;
    const scrollTriggerNum = parseInt(scrollTrigger, 10);
    const newScrollTrigger = Math.round((innerHeight * scrollTriggerNum) / 100);

    setNewScrollTrigger(newScrollTrigger);
  }, [scrollTrigger]);

  // # 스크롤 start, end
  useEffect(() => {
    if (!containerRef?.current || !innerContainerRef.current || !scrollTargetEl) {
      return;
    }

    const innerContainerY = innerContainerRef.current.getBoundingClientRect().y;
    const targetY = scrollTargetEl.getBoundingClientRect().y;
    const baseY = targetY - innerContainerY;
    const newScrollStart = scrollStart !== undefined ? scrollStart + baseY : undefined;
    const newScrollEnd = scrollEnd !== undefined ? scrollEnd + baseY : undefined;

    setNewScrollStart(newScrollStart);
    setNewScrollEnd(newScrollEnd);
  }, [containerRef, scrollTargetEl, scrollStart, scrollEnd]);

  return (
    <section className={cn("flex flex-col", className)}>
      {title &&
        (titleLink ? (
          <h2 id={titleLink}>
            <Link color="foreground" href={`#${titleLink}`} className="group [&>span]:opacity-0">
              {title}
              <span className="pl-1 transition-opacity group-hover:opacity-100">#</span>
            </Link>
          </h2>
        ) : (
          <h2>{title}</h2>
        ))}

      <div className="flex items-center gap-x-2">
        <div className="flex-1">
          {description && <p className="mt-2 text-xs text-gray-400">{description}</p>}
        </div>
      </div>

      <div
        className={cn(
          "relative mt-2 min-h-[140px] overflow-hidden rounded-medium border p-2 dark:border-gray-600",
          classNames?.container,
        )}
        ref={containerRef}
      >
        <div className={cn("relative min-h-[inherit]")} ref={innerContainerRef}>
          {/* 스크롤 표시자 */}
          <ScrollProgressIndicator
            trigger={newScrollTrigger}
            start={newScrollStart}
            end={newScrollEnd}
          />
          <div className="min-h-[120px]">{children}</div>

          <div className="h-8">
            {!hideController && isReady && paligaRef.current && (
              <TestSectionController
                className="mt-2"
                paliga={paligaRef.current}
                defaultProgress={defaultProgress}
                onPlay={({ paliga }) => onPlay && onPlay({ paliga })}
                onPause={({ paliga }) => onPause && onPause({ paliga })}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 테스트에 사용될 엘리먼트 */
const Box = forwardRef(
  (
    { className, children }: { className?: string; children?: ReactNode },
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        className={cn(`relative h-5 w-5 rounded-[6px] bg-warning-500 text-[0.7rem]`, className)}
        ref={ref}
      >
        <div className="translate-x-[calc(100%+8px)] whitespace-nowrap dark:text-gray-400">
          {children}
        </div>
      </div>
    );
  },
);
Box.displayName = "Box";

/** scroll progress 표시자 */
const ScrollProgressIndicator = ({
  trigger,
  start,
  end,
}: {
  trigger?: number;
  start?: number;
  end?: number;
}) => {
  return (
    <>
      {typeof trigger === "number" && (
        <div className="sticky top-0 z-[1] h-[1px] w-full text-right" style={{ top: trigger }}>
          <div className="flex items-start justify-end">
            <span className="mr-2 -translate-y-[50%] text-[0.64rem] text-green-500">Trigger</span>
            <div className="h-[1px] w-10 bg-green-500"></div>
          </div>
        </div>
      )}

      {typeof start === "number" && (
        <div className="absolute right-0" style={{ top: start }}>
          <div className="flex items-start">
            <span className="mr-2 -translate-y-[50%] text-[0.64rem] text-red-500">Start</span>
            <div className="h-[1px] w-10 bg-red-500"></div>
          </div>
        </div>
      )}

      {typeof end === "number" && (
        <div className="absolute right-0" style={{ top: end }}>
          <div className="flex items-start">
            <span className="mr-2 -translate-y-[50%] text-[0.64rem] text-blue-500">End</span>
            <div className="h-[1px] w-10 bg-blue-500"></div>
          </div>
        </div>
      )}
    </>
  );
};

/** ===== Others ===== */

/** ===== Types ===== */
export type TestSectionProps = {
  /** 제목 */
  title?: string;
  /** 제목 링크 */
  titleLink?: string;
  /** 설명 */
  description?: string;
  /** 클래스 */
  className?: string;
  /** 기본 progress */
  defaultProgress?: number;
  /** scroll progress 의 trigger 표시(%) */
  scrollTrigger?: string;
  /** scroll progress 의 trigger 표시 */
  scrollStart?: number;
  /** scroll progress 의 trigger 표시 */
  scrollEnd?: number;
  /** true 일 경우 컨트롤러 감추기 */
  hideController?: boolean;
  /** disabled initialize */
  disableInitialized?: boolean;
  /** scroll progress 의 대상이 될 첫번째 엘리먼트의 Y */
  scrollTargetEl?: HTMLDivElement | null;
  /** 하위 요소의 클래스 */
  classNames?: {
    /** 자식 요소 래퍼의 클래스 */
    container?: string;
  };
  /** paliga 인스턴스 */
  paligaRef?: MutableRefObject<Paliga>;
  /** children */
  children?: ReactNode;
  /** container의 ref */
  containerRef?: RefObject<HTMLDivElement>;
  /** 플레이 시 콜백 */
  onPlay?: ({ paliga }: { paliga?: Paliga }) => void;
  /** 플레이 시 콜백 */
  onPause?: ({ paliga }: { paliga?: Paliga }) => void;
  /** 인스턴스 생성 완료 후 콜백 */
  onReady?: ({ paliga }: { paliga: Paliga }) => void;
};

TestSection.Box = Box;
TestSection.Controller = TestSectionController;

export default TestSection;
