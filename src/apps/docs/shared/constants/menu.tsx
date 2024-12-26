import { TMenu } from "../../widgets/Menu";

export const MENU_ITEMS: TMenu = [
  {
    label: "Methods",
    items: [
      { label: "Timeline", path: "/timeline" },
      { label: "Play", path: "/play" },
      { label: "Intersection Play", path: "/intersection-play" },
      { label: "progress", path: "/progress" },
      { label: "Scroll Progress", path: "/scroll-progress" },
    ],
  },
] as const;
