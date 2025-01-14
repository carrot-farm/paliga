export const ANIMATION_CODES = {
  ["animation-translate"]: `
const box1 = document.getElementById('#box1');
const box2 = document.getElementById('#box2');
const box3 = document.getElementById('#box3');
const paliga = new Paliga();

paliga.timeline([box1, box2, box3], {
  each: (_, i) => ({
    x: i === 0 ? 200 : 0,
    y: i === 1 ? 30 : 0,
    z: i === 2 ? -400 : 0,
  })
}).play();
`.trim(),
} as const;
