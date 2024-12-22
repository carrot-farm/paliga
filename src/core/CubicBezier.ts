/** 큐빅 비자이어 곡선 */
export class CubicBezier {
  static #subdivisionPreciseion = 0.0000001;
  static #subdivisitionMaxInterations = 12;

  static #calcBezier(t: number, a1: number, a2: number) {
    const result = (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
    return result;
  }

  static #binarySubdivide(
    x: number,
    lowerBound: number,
    upperBound: number,
    px1: number,
    px2: number,
  ) {
    let currentX: number;
    let currentT: number;
    let i: number = 0;

    do {
      currentT = lowerBound + (upperBound - lowerBound) / 2;
      currentX = this.#calcBezier(currentT, px1, px2) - x;
      if (currentX > 0) {
        upperBound = currentT;
      } else {
        lowerBound = currentT;
      }
    } while (
      Math.abs(currentX) > this.#subdivisionPreciseion &&
      ++i < this.#subdivisitionMaxInterations
    );

    return currentT;
  }

  static calc(px1: number, py1: number, px2: number, py2: number, t: number) {
    if (px1 === py1 && px2 === py2) {
      return t;
    }

    const getTForX = (x: number) => this.#binarySubdivide(x, 0, 1, px1, px2);
    return t === 0 || t === 1 ? t : this.#calcBezier(getTForX(t), py1, py2);
  }
}
