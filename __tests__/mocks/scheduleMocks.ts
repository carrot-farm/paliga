import { TAnimation, TSchedule } from "../../src/types";
import { MOCK_BOX_1 } from "./elementMocks";

const MOCK_ANIMATION_1: TAnimation = {
  easing: "linear",
  direction: "normal",
  delay: 0,
  duration: 1000,
  sumDuration: 1000,
  element: MOCK_BOX_1,
  from: {
    duration: 0,
    progress: 0,
    x: 0,
    y: 0,
  },
  to: {
    duration: 1000,
    progress: 0.5,
    x: 100,
    y: 80,
  },
  onFrame: undefined,
  toDelay: undefined,
};

/** 세개의 애니메이션을 보유 */
export const MOCK_SCHEDULE_1: TSchedule = {
  id: "1",
  state: "idle",
  maxDuration: 3000,
  progress: 0,
  element: MOCK_BOX_1,
  animations: [
    {
      ...MOCK_ANIMATION_1,
      to: {
        duration: 1000,
        progress: 0.33,
        x: 100,
        y: 80,
      },
    },
    {
      ...MOCK_ANIMATION_1,
      from: {
        duration: 1000,
        progress: 0.33,
        x: 100,
        y: 80,
      },
      to: {
        duration: 2000,
        progress: 0.66,
        x: 200,
        y: 180,
      },
    },
    {
      ...MOCK_ANIMATION_1,
      from: {
        duration: 2000,
        progress: 0.66,
        x: 200,
        y: 180,
      },
      to: {
        duration: 3000,
        progress: 1,
        x: 300,
        y: 180,
      },
    },
  ],
};
