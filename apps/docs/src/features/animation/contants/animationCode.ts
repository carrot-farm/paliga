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

  ["transition-width-height"]: `
const box1 = document.getElementById('#box1');
const box2 = document.getElementById('#box2');
const paliga = new Paliga();

paliga.timeline([box1, box2], {
  each: (_, i) => ({
    width: i === 0 ? 80 : undefined,
    height: i === 1 ? 80 : undefined,
  })
}).play();
`.trim(),

  ["transition-border"]: `
const box1 = document.getElementById('#box1');
const box2 = document.getElementById('#box2');
const paliga = new Paliga();

paliga.timeline([box1, box2], {
  borderWidth: 3,
  each: (_, i) => ({
    borderColor: i === 1 ? "#262df1" : undefined,
  }),
}).play();
`.trim(),

  ["transition-scale"]: `
const box1 = document.getElementById('#box1');
const box2 = document.getElementById('#box2');
const box3 = document.getElementById('#box3');
const box4 = document.getElementById('#box4');
const paliga = new Paliga();

paliga.timeline([box1, box2, box3, box4], {
  scale: i === 0 ? 0.7 : undefined,
  scaleX: i === 1 ? 0.7 : undefined,
  scaleY: i === 2 ? 0.7 : undefined,
  scaleZ: i === 3 ? 0.7 : undefined,
}).play();
`.trim(),

  ["transition-rotate"]: `
const box1 = document.getElementById('#box1');
const box2 = document.getElementById('#box2');
const box3 = document.getElementById('#box3');
const paliga = new Paliga();

paliga.timeline([box1, box2, box3], {
  rotateX: i === 0 ? 45 : undefined,
  rotateY: i === 1 ? 45 : undefined,
  rotateZ: i === 2 ? 45 : undefined,  
}).play();
`.trim(),

  ["transition-opacity"]: `
const box1 = document.getElementById('#box1');
const paliga = new Paliga();

paliga.timeline([box1], {
  opacity: 0
}).play();
`.trim(),

  ["transition-backgroundColor"]: `
const box1 = document.getElementById('#box1');
const paliga = new Paliga();

paliga.timeline([box1], {
  backgroundColor: "#8214b880",
}).play();
`.trim(),
} as const;
