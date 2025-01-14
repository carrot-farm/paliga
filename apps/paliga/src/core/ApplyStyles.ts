import { TApplyStylesParams } from "../types";

export class ApplyStyles {
  /** x */
  static translateX({ x }: Pick<TApplyStylesParams, "x">) {
    return `translateX(${x}px)`;
  }
  /** y */
  static translateY({ y }: Pick<TApplyStylesParams, "y">) {
    return `translateY(${y}px)`;
  }
  /** z */
  static translateZ({ z }: Pick<TApplyStylesParams, "z">) {
    return `translateZ(${z}px)`;
  }

  /** scaleX */
  static scaleX({ scaleX }: Pick<TApplyStylesParams, "scaleX">) {
    return `scaleX(${scaleX})`;
  }
  /** scaleY */
  static scaleY({ scaleY }: Pick<TApplyStylesParams, "scaleY">) {
    return `scaleY(${scaleY})`;
  }
  /** scaleZ */
  static scaleZ({ scaleZ }: Pick<TApplyStylesParams, "scaleZ">) {
    return `scaleZ(${scaleZ})`;
  }

  /** 회전 */
  static rotateX(rotateX: TApplyStylesParams["rotateX"]) {
    return `rotateX(${rotateX}deg)`;
  }
  static rotateY(rotateY: TApplyStylesParams["rotateY"]) {
    return `rotateY(${rotateY}deg)`;
  }
  static rotateZ(rotateZ: TApplyStylesParams["rotateZ"]) {
    return `rotateZ(${rotateZ}deg)`;
  }

  /** width, height */
  static width({ el, width }: Pick<TApplyStylesParams, "el" | "width">) {
    el.style.width = `${width}px`;
  }
  static height({ el, height }: Pick<TApplyStylesParams, "el" | "height">) {
    el.style.height = `${height}px`;
  }

  /** 투명도 */
  static opacity({ el, opacity }: Pick<TApplyStylesParams, "el" | "opacity">) {
    el.style.opacity = String(opacity);
  }

  /** border */
  static borderWidth({ borderWidth }: Pick<TApplyStylesParams, "borderWidth">) {
    return `${borderWidth}px`;
  }
  static borderColor({ borderColor = [0, 0, 0, 0] }: Pick<TApplyStylesParams, "borderColor">) {
    const [r, g, b, a] = borderColor;
    return `rgba(${r},${g},${b},${a})`;
  }

  /** 배경색 */
  static backgroundColor([r, g, b, a]: TApplyStylesParams["backgroundColor"] = [0, 0, 0, 0]) {
    return `rgba(${r},${g},${b},${a})`;
  }

  /** 라우터 */
  static router({
    el,
    x,
    y,
    z,
    scaleX,
    scaleY,
    scaleZ,
    rotateX,
    rotateY,
    rotateZ,
    width,
    height,
    opacity,
    borderWidth,
    borderColor,
    backgroundColor,
  }: TApplyStylesParams) {
    let transform: string = "";

    /** translate */
    if (x !== undefined) {
      transform += (transform ? " " : "") + this.translateX({ x });
    }
    if (y !== undefined) {
      transform += (transform ? " " : "") + this.translateY({ y });
    }
    if (z !== undefined) {
      transform += (transform ? " " : "") + this.translateZ({ z });
    }

    /** scale */
    if (scaleX !== undefined) {
      transform += (transform ? " " : "") + this.scaleX({ scaleX });
    }
    if (scaleY !== undefined) {
      transform += (transform ? " " : "") + this.scaleY({ scaleY });
    }
    if (scaleZ !== undefined) {
      transform += (transform ? " " : "") + this.scaleZ({ scaleZ });
    }

    /** rotate */
    if (rotateX !== undefined) {
      transform += (transform ? " " : "") + this.rotateX(rotateX);
    }
    if (rotateY !== undefined) {
      transform += (transform ? " " : "") + this.rotateY(rotateY);
    }
    if (rotateZ !== undefined) {
      transform += (transform ? " " : "") + this.rotateZ(rotateZ);
    }

    /** rotate */
    if (width !== undefined) {
      transform += (transform ? " " : "") + this.width({ el, width });
    }
    if (height !== undefined) {
      transform += (transform ? " " : "") + this.height({ el, height });
    }

    /** border */
    if (borderWidth !== undefined) {
      el.style.setProperty("border-width", this.borderWidth({ borderWidth }));
    }
    if (borderColor !== undefined) {
      el.style.setProperty("border-color", this.borderColor({ borderColor }));
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
