export const getInnerHeight = (el: HTMLElement) => {
  const { height } = el.getBoundingClientRect();
  const pt = parseInt(el.computedStyleMap().get("padding-top")?.toString() ?? "0", 10);
  const pb = parseInt(el.computedStyleMap().get("padding-bottom")?.toString() ?? "0", 10);
  const borderWidth = parseInt(el.computedStyleMap().get("border-width")?.toString() ?? "0", 10);
  const innerHeight = height - pt - pb - borderWidth * 2;

  return innerHeight;
};

/** hex 코드일 경우 true 반환 */
export const getColorType = (color: string) => {
  if (color[0] === "#" && (color.length === 4 || color.length === 7 || color.length === 9)) {
    return "hex";
  }
  const [name] = color.split("(");

  return name;
};

/** hex 를 rgba() 로 변환 */
export const hexToRgba = (hex: string) => {
  let r: number | undefined;
  let g: number | undefined;
  let b: number | undefined;
  let a: number | string = 1;

  if (hex.length === 4) {
    const [, red, green, blue] = hex;

    r = parseInt(`${red}${red}`, 16);
    g = parseInt(`${green}${green}`, 16);
    b = parseInt(`${blue}${blue}`, 16);
  }

  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  if (hex.length === 9) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    a = parseInt(hex.slice(7, 9), 16) / 255;

    if (a < 1 && a !== 0) {
      a = a.toFixed(1);
    }
  }

  if (!r || !g || !b) {
    throw new Error("invalid hex: " + hex);
  }

  return `rgba(${r},${g},${b},${a})`;
};

/** 컬러를 rgba 로 변경 */
export const convertToRgba = {
  hex: (color: string) => hexToRgba(color),
  rgb: (color: string) => {
    const [r, b, g] = color.match(/\d+/g) as string[];
    return `rgba(${r},${b},${g},1)`;
  },
  rgba: (color: string) => color,
  router(color: string) {
    const colorType = getColorType(color) as "hex" | "rgb" | "rgba";

    if (!this[colorType]) {
      throw new Error("not supported colorType: " + colorType);
    }

    return this[colorType](color);
  },
};

/** rgba 문자열을 숫자 배열로 변환 */
export const convertToRgbaNumbers = (color: string): [number, number, number, number] => {
  const [r, g, b, a] = convertToRgba.router(color).match(/\d\.?\d*/g) as string[];

  return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10), Number(a)];
};

/** 엘리먼트에서 지정된 속성의 값을 숫자로 반환 */
export const getElementStyleToNumber = (element: HTMLElement, attr: string) => {
  const value = element.computedStyleMap().get(attr)?.toString();
  const num = value ? parseInt(value, 10) : undefined;
  return num;
};
