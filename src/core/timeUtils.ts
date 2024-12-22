/** debounce & throttle */
const timeoutFn = (type: "debounce" | "throttle") => {
  let throttleFn: ReturnType<typeof setTimeout> | null;
  let debounceFn: ReturnType<typeof setTimeout>;
  let lastFn: (() => void) | null;

  /** debounce */
  const debounce = (f: () => void, time = 100) => {
    if (debounceFn) {
      clearTimeout(debounceFn);
    }
    debounceFn = setTimeout(() => {
      if (typeof f === "function") {
        f();
      }
    }, time);
  };

  /** throttle */
  const throttle = (f: () => void, time = 100) => {
    if (throttleFn) {
      lastFn = f;
      return;
    }

    f();

    throttleFn = setTimeout(() => {
      throttleFn = null;
      // console.log("> last: ");
      if (typeof lastFn === "function") {
        lastFn();
        lastFn = null;
      }
    }, time);
  };

  /** instance */
  return (f: () => void, time = 100) => {
    switch (type) {
      case "debounce":
        return debounce(f, time);
      case "throttle":
        return throttle(f, time);
      default:
        throw new Error("invalid type: " + type);
    }
  };
};

/** 쓰로틀 함수 */
export const throttle = timeoutFn("throttle");

/** 디바운스 */
export const debounce = timeoutFn("debounce");
