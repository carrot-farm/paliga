import { TEasingParams } from "../types";
import { CubicBezier } from "./CubicBezier";

/** 여러 이징 */
export class Easing {
  static cubicBezier(t: number, p1x: number, p1y: number, p2x: number, p2y: number) {
    return CubicBezier.calc(p1x, p1y, p2x, p2y, t);
  }

  static linear(t: number) {
    return t;
  }

  static ease(t: number) {
    return CubicBezier.calc(0.25, 0.1, 0.25, 1, t);
  }

  static easeIn(t: number) {
    return CubicBezier.calc(0.42, 0, 1, 1, t);
  }

  static easeOut(t: number) {
    return CubicBezier.calc(0, 0, 0.58, 1, t);
  }

  static easeInOut(t: number) {
    return CubicBezier.calc(0.42, 0, 0.58, 1, t);
  }

  static easeInBounce(t: number) {
    return 1 - this.easeOutBounce(1 - t);
  }
  static easeOutBounce(t: number) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

  static router({ progress, easing }: TEasingParams) {
    if (typeof easing === "object") {
      return this.cubicBezier(progress, easing[0], easing[1], easing[2], easing[3]);
    }
    return this[easing](progress);
  }
}
