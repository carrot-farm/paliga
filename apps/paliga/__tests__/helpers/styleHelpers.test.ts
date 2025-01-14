import { describe, expect, test } from "vitest";
import {
  convertToRgba,
  convertToRgbaNumbers,
  getColorType,
  hexToRgba,
} from "../../src/helpers/styleHelpers";

describe("getColorType()", () => {
  test("hex 3자리 문자열 테스트", () => {
    const color = "#fff";
    expect(getColorType(color)).toBe("hex");
  });

  test("hex 7자리 문자열 테스트", () => {
    const color = "#ffffff";
    expect(getColorType(color)).toBe("hex");
  });

  test("hex 9자리 문자열 테스트", () => {
    const color = "#ffffffff";
    expect(getColorType(color)).toBe("hex");
  });

  test("rgb 테스트", () => {
    expect(getColorType("rgb(255,255,255)")).toBe("rgb");
  });

  test("rgba 테스트", () => {
    expect(getColorType("rgba(255,255,255,1)")).toBe("rgba");
  });

  test("hsl 테스트", () => {
    expect(getColorType("hsl(255 255 255)")).toBe("hsl");
  });

  test("hsla 테스트", () => {
    expect(getColorType("hsla(255 255 255 / 10%)")).toBe("hsla");
  });
});

describe("hexToRgba()", () => {
  test("3자리 hex 문자열 변환", () => {
    expect(hexToRgba("#fff")).toBe("rgba(255,255,255,1)");
  });

  test("7자리 hex 문자열 변환", () => {
    expect(hexToRgba("#b89c14")).toBe("rgba(184,156,20,1)");
  });

  test("7자리 hex 문자열 변환", () => {
    expect(hexToRgba("#b89c1480")).toBe("rgba(184,156,20,0.5)");
  });
});

describe("convertToRgba()", () => {
  test("3자리 hex 문자열 변환", () => {
    expect(convertToRgba.router("#fff")).toBe("rgba(255,255,255,1)");
  });

  test("7자리 hex 문자열 변환", () => {
    expect(convertToRgba.router("#b89c14")).toBe("rgba(184,156,20,1)");
  });

  test("7자리 hex 문자열 변환", () => {
    expect(convertToRgba.router("#b89c1480")).toBe("rgba(184,156,20,0.5)");
  });

  test("rgb 반환", () => {
    expect(convertToRgba.router("rgb(184,156,20)")).toBe("rgba(184,156,20,1)");
  });

  test("rgba 반환", () => {
    expect(convertToRgba.router("rgba(184,156,20,0.5)")).toBe("rgba(184,156,20,0.5)");
  });
});

describe("convertToRgbaNumbers()", () => {
  test("3자리 hex 문자열 변환", () => {
    expect(convertToRgbaNumbers("#fff")).toEqual([255, 255, 255, 1]);
  });

  test("7자리 hex 문자열 변환", () => {
    expect(convertToRgbaNumbers("#b89c14")).toEqual([184, 156, 20, 1]);
  });

  test("7자리 hex 문자열 변환", () => {
    expect(convertToRgbaNumbers("#b89c1480")).toEqual([184, 156, 20, 0.5]);
  });

  test("rgb 반환", () => {
    expect(convertToRgbaNumbers("rgb(184,156,20)")).toEqual([184, 156, 20, 1]);
  });

  test("rgba 반환", () => {
    expect(convertToRgbaNumbers("rgba(184,156,20,0.5)")).toEqual([184, 156, 20, 0.5]);
  });
});
