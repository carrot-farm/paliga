import { TApplyStylesParams } from "../types";

export class ApplyStyles {
  /** 좌표 이동 */
  static coordinate({ el, x = 0, y = 0 }: Pick<TApplyStylesParams, "el" | "x" | "y">) {
    el.style.transform = `translate3d(${x}px,${y}px,0px)`;
  }

  /** 투명도 */
  static opacity({ el, opacity }: Pick<TApplyStylesParams, "el" | "opacity">) {
    el.style.opacity = String(opacity);
  }

  /** 라우터 */
  static router({ el, x, y, opacity }: TApplyStylesParams) {
    if (typeof x === "number" || typeof y === "number") {
      this.coordinate({ el, x, y });
    }
    if (typeof opacity === "number") {
      this.opacity({ el, opacity });
    }
  }
}
