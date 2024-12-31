import { TApplyStylesParams } from "../types";

export class ApplyStyles {
  /** 좌표 이동 */
  static coordinate({ x = 0, y = 0, z = 0 }: Pick<TApplyStylesParams, "x" | "y" | "z">) {
    return `translate3d(${x}px,${y}px,${z}px)`;
  }

  /** 스케일 */
  static scale(scale: TApplyStylesParams["scale"] = [1, 1, 1]) {
    return `scale3d(${scale[0]},${scale[1]},${scale[2]})`;
  }

  /** 투명도 */
  static opacity({ el, opacity }: Pick<TApplyStylesParams, "el" | "opacity">) {
    el.style.opacity = String(opacity);
  }

  static rotateX(rotateX: TApplyStylesParams["rotateX"]) {
    return `rotateX(${rotateX}deg)`;
  }

  static rotateY(rotateY: TApplyStylesParams["rotateY"]) {
    return `rotateY(${rotateY}deg)`;
  }

  static rotateZ(rotateZ: TApplyStylesParams["rotateZ"]) {
    return `rotateZ(${rotateZ}deg)`;
  }

  static backgroundColor([r, g, b, a]: TApplyStylesParams["backgroundColor"] = [0, 0, 0, 0]) {
    return `rgba(${r},${g},${b},${a})`;
  }

  /** 라우터 */
  static router({
    el,
    x,
    y,
    z,
    opacity,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    backgroundColor,
  }: TApplyStylesParams) {
    let transform: string = "";

    if (typeof x === "number" || typeof y === "number" || typeof z === "number") {
      transform += this.coordinate({ x, y, z });
    }

    if (rotateX !== undefined) {
      transform += (transform ? " " : "") + this.rotateX(rotateX);
    }

    if (rotateY !== undefined) {
      transform += (transform ? " " : "") + this.rotateY(rotateY);
    }

    if (rotateZ !== undefined) {
      transform += (transform ? " " : "") + this.rotateZ(rotateZ);
    }

    if (scale) {
      transform += (transform ? " " : "") + this.scale(scale);
    }

    if (transform !== "") {
      el.style.setProperty("transform", transform);
    }

    if (backgroundColor) {
      el.style.setProperty("background-color", this.backgroundColor(backgroundColor));
    }

    if (typeof opacity === "number") {
      this.opacity({ el, opacity });
    }
  }
}
