/** 최소값, 최대값 범위를 제한 */
export const minMax = (value: number, min: number, max: number) =>
  value <= min ? min : value >= max ? max : value;
