import { TSchedule } from "../types";
import { animationsRunner } from "./animationHelpers";

/** 스케쥴을 실행 */
type TScheduleRunnerParams = {
  scheduleList: TSchedule[];
  onFrame?: (data: TScheduleRunnerOnParams) => void;
  onAnimationEnd?: (data: TScheduleRunnerOnParams) => void;
} & Omit<
  Parameters<typeof animationsRunner>[0],
  "maxDuration" | "animations" | "onFrame" | "onAnimationEnd"
>;
type TScheduleRunnerOnParams = {
  progress: number;
  elapsed: number;
  index: number;
  schedule: TSchedule;
};

export const scheduleRunner = ({
  startProgress,
  endProgress,
  scheduleList,
  duration,
  onFrame,
  onAnimationEnd,
}: TScheduleRunnerParams) => {
  const len = scheduleList.length;
  let i = 0;

  const runner = ({
    startProgress,
    endProgress,
  }: Pick<Parameters<typeof scheduleRunner>[0], "startProgress" | "endProgress">) => {
    while (i < len) {
      const schedule = scheduleList[i];
      const { maxDuration, animations } = schedule;
      const newDuration = duration ?? maxDuration;

      animationsRunner({
        startProgress,
        endProgress,
        duration: newDuration,
        maxDuration,
        animations,
        onFrame: ({ progress, elapsed }) => {
          if (onFrame) {
            onFrame({ progress, elapsed, index: i, schedule });
          }
        },
        onAnimationEnd: ({ progress, elapsed }) => {
          if (onAnimationEnd) {
            onAnimationEnd({ progress, elapsed, index: i, schedule });
          }
        },
      });

      i++;
    }
  };

  runner({ startProgress, endProgress });
};
