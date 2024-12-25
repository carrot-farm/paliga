"use client";
import { Button, cn, Link } from "@nextui-org/react";
import { forwardRef, ReactNode, Ref } from "react";

/** ===== Components ===== */
/** 기본 테스트 */
function TestSection({
  title,
  titleLink,
  description,
  className,
  classNames,
  children,
  onPlay,
  onPause,
}: TestSectionProps) {
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
          {description && <p className="mt-2 text-xs text-gray-500">{description}</p>}
        </div>

        <div className="flex items-center gap-x-2">
          {onPause && (
            <Button color="danger" variant="shadow" size="sm" onPress={onPause}>
              Pause
            </Button>
          )}

          {onPlay && (
            <Button color="warning" variant="shadow" size="sm" onPress={onPlay}>
              Play
            </Button>
          )}
        </div>
      </div>

      <div
        className={cn(
          "relative mt-2 min-h-[140px] rounded-medium border p-2 dark:border-gray-500",
          classNames?.container,
        )}
      >
        {children}
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
  /** 하위 요소의 클래스 */
  classNames?: {
    /** 자식 요소 래퍼의 클래스 */
    container?: string;
  };
  /** children */
  children?: ReactNode;
  /** 플레이 시 콜백 */
  onPlay?: () => void;
  /** 플레이 시 콜백 */
  onPause?: () => void;
};

TestSection.Box = Box;

export default TestSection;
