import { TMenu } from "../../widgets/Menu";

export const MENU_ITEMS: TMenu = [
  {
    label: "Getting Started",
    items: [{ label: "Installation", path: "/guide/installation" }],
  },
  {
    label: "Animation",
    items: [{ label: "Transition", path: "/animation/transition" }],
  },
  {
    label: "Methods",
    items: [
      { label: "Timeline", path: "/timeline" },
      { label: "Play", path: "/play" },
      { label: "Pause & Resume", path: "/pause" },
      { label: "Reverse", path: "/methods/reverse" },
      { label: "Intersection Play", path: "/intersection-play" },
      { label: "progress", path: "/progress" },
      { label: "Scroll Progress", path: "/scroll-progress" },
    ],
  },
  {
    label: "React",
    items: [
      { label: "Timeline", path: "react/timeline" },
      { label: "TimelineGroup", path: "react/timeline-group" },
      { label: "Dev", path: "react/dev" },
      { label: "UsePaliga", path: "react/use-paliga" },
    ],
  },
] as const;
