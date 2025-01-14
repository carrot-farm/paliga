export const getInnerHeight = (el: HTMLElement) => {
  const height = el.clientHeight;
  const { paddingTop, paddingBottom, borderWidth } = window.getComputedStyle(el);
  const pt = parseInt(paddingTop, 10);
  const pb = parseInt(paddingBottom, 10);
  const newBorderWidth = parseInt(borderWidth, 10) * 2;
  const innerHeight = height - pt - pb - newBorderWidth;

  return innerHeight;
};

/** 엘리먼트 혹은 window의 상단 으로부터 얼마나 떨어져 있는지 반환 */
export const getDistanceFromTop = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

/** 조건을 만족하는 부모 요소를 찾는다 */
export const findParent = (el: HTMLElement, f: (el: HTMLElement) => boolean) => {
  let newEl = el;

  while (newEl.parentElement) {
    newEl = newEl.parentElement;
    if (f(newEl) === true) {
      return newEl;
    }
  }
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

/** rgb 를 hex 로 변경 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  // 각 RGB 값을 16진수로 변환하고, 두 자리로 만듦
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  // HEX 값으로 조합
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/** rgba 를 hex로 변환 */
export const rgbToHexWithAlpha = (r: number, g: number, b: number, alpha: number): string => {
  // 각 RGB 값을 16진수로 변환하고, 두 자리로 만듦
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  // 알파값을 0~255 범위로 변환한 후 16진수로 변환
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0"); // 두 자리로 만듦

  // HEX 값으로 조합 (알파값 포함)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
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
