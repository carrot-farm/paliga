import { vi } from "vitest";

/** `requestAnimationFrame` 을 mock으로 구현 */
export const mockRequestAnimationFrame = () => {
  let timestamp = 300;

  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    timestamp += 50;
    cb(timestamp);
    return timestamp;
  });
};
