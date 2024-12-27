export const getInnerHeight = (el: HTMLElement) => {
  const { height } = el.getBoundingClientRect();
  const pt = parseInt(el.computedStyleMap().get("padding-top")?.toString() ?? "0", 10);
  const pb = parseInt(el.computedStyleMap().get("padding-bottom")?.toString() ?? "0", 10);
  const borderWidth = parseInt(el.computedStyleMap().get("border-width")?.toString() ?? "0", 10);
  const innerHeight = height - pt - pb - borderWidth * 2;

  return innerHeight;
};
