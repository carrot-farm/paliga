import { JSDOM } from "jsdom";

const dom = new JSDOM(
  `<body>${Array.from({ length: 5 }, (_, i) => `<div id="box${i + 1}"></div>`)}/body>`,
);

export const MOCK_BOX_1 = dom.window.document.getElementById("box1")!;
export const MOCK_BOX_2 = dom.window.document.getElementById("box2")!;
export const MOCK_BOX_3 = dom.window.document.getElementById("box3")!;
export const MOCK_BOX_4 = dom.window.document.getElementById("box4")!;
export const MOCK_BOX_5 = dom.window.document.getElementById("box5")!;
