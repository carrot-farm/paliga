import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { TCallbackParams } from "../../src/core/framer";
import { animationsRunner, getRangeAnimations } from "../../src/helpers/animationHelpers";
import { mockRequestAnimationFrame } from "../../src/helpers/testHelpers";
import { MOCK_SCHEDULE_1 } from "../mocks/scheduleMocks";

describe("getRangeAnimations()", () => {
  test("0 ~ 1 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0,
      endProgress: 1,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(3);
    expect(result[0].to.progress).toBe(0.33);
    expect(result[1].to.progress).toBe(0.66);
    expect(result[2].to.progress).toBe(1);
  });

  test("0 ~ 0.5 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0,
      endProgress: 0.5,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(2);
    expect(result[0].to.progress).toBe(0.33);
    expect(result[1].to.progress).toBe(0.66);
  });

  test("0.33 ~ 0.5 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0.33,
      endProgress: 0.5,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(1);
    expect(result[0].to.progress).toBe(0.66);
  });

  test("0.66 ~ 1 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0.66,
      endProgress: 1,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(1);
    expect(result[0].to.progress).toBe(1);
  });

  test("0 ~ 0 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0,
      endProgress: 0,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(1);
    expect(result[0].to.progress).toBe(0.33);
  });

  test("0.33 ~ 0.33 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 0.33,
      endProgress: 0.33,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(1);
    expect(result[0].to.progress).toBe(0.66);
  });

  test("1 ~ 1 사이의 애니메이션 반환", async () => {
    const result = getRangeAnimations({
      startProgress: 1,
      endProgress: 1,
      animations: MOCK_SCHEDULE_1.animations,
    });

    expect(result).toHaveLength(1);
    expect(result[0].to.progress).toBe(1);
  });
});

describe("animationsRunner()", () => {
  const baseParams: Parameters<typeof animationsRunner>[0] = {
    startProgress: 0,
    endProgress: 1,
    duration: 500,
    maxDuration: 500,
    animations: MOCK_SCHEDULE_1.animations,
    onFrame: () => {},
    onAnimationEnd: () => {},
  };

  beforeEach(() => {
    mockRequestAnimationFrame();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("0 ~ 1 진행도 확인", () => {
    const params: Parameters<typeof animationsRunner>[0] = {
      ...baseParams,
      startProgress: 0,
      endProgress: 1,
      duration: 500,
    };
    const spyOnAnimationEnd = vi.spyOn(params, "onAnimationEnd");
    animationsRunner(params);
    const transform = params.animations[0].element.style.transform.trim();

    expect(spyOnAnimationEnd).toBeCalledTimes(1);
    expect(spyOnAnimationEnd).toBeCalledWith({ progress: 1, elapsed: 500 });
    expect(transform).toBe("translate3d(300px,180px,0px)");
  });

  test("0 ~ 0.2 진행도 확인", () => {
    const params: Parameters<typeof animationsRunner>[0] = {
      ...baseParams,
      startProgress: 0,
      endProgress: 0.2,
      duration: 500,
    };
    const spyOnAnimationEnd = vi.spyOn(params, "onAnimationEnd");
    animationsRunner(params);
    const transform = params.animations[0].element.style.transform.trim();

    expect(spyOnAnimationEnd).toBeCalledTimes(1);
    expect(spyOnAnimationEnd).toBeCalledWith({ progress: 0.2, elapsed: 100 });
    expect(transform).toBe("translate3d(60.60606060606061px,48.484848484848484px,0px)");
  });

  test("0.2 ~ 1 진행도 확인", () => {
    let firstFrame: TCallbackParams | undefined;
    const params: Parameters<typeof animationsRunner>[0] = {
      ...baseParams,
      startProgress: 0.2,
      endProgress: 1,
      duration: 500,
      onFrame: (data) => {
        if (!firstFrame) {
          firstFrame = data;
        }
      },
    };

    const spyOnAnimationEnd = vi.spyOn(params, "onAnimationEnd");
    const spyOnFrame = vi.spyOn(params, "onFrame");
    animationsRunner(params);
    const transform = params.animations[0].element.style.transform.trim();

    expect(spyOnFrame).toBeCalled();
    expect(firstFrame).toEqual({ progress: 0.2, elapsed: 100 });
    expect(spyOnAnimationEnd).toBeCalledTimes(1);
    expect(spyOnAnimationEnd).toBeCalledWith({ progress: 1, elapsed: 500 });
    expect(transform).toBe("translate3d(300px,180px,0px)");
  });

  test("0.8 ~ 0.2 역진행도 확인", () => {
    let firstFrame: TCallbackParams | undefined;
    const params: Parameters<typeof animationsRunner>[0] = {
      ...baseParams,
      startProgress: 0.8,
      endProgress: 0.2,
      duration: 500,
      onFrame: (data) => {
        if (!firstFrame) {
          firstFrame = data;
        }
      },
    };

    const spyOnAnimationEnd = vi.spyOn(params, "onAnimationEnd");
    const spyOnFrame = vi.spyOn(params, "onFrame");
    animationsRunner(params);
    const transform = params.animations[0].element.style.transform.trim();

    expect(spyOnFrame).toBeCalled();
    expect(spyOnAnimationEnd).toBeCalledTimes(1);
    expect(firstFrame).toEqual({ progress: 0.8, elapsed: 100 });
    expect(spyOnAnimationEnd).toBeCalledWith({ progress: 0.2, elapsed: 400 });
    expect(transform).toBe("translate3d(60.60606060606061px,48.484848484848484px,0px)");
  });
});
