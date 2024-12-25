import { TMenu } from "../../widgets/Menu";

export const MENU_ITEMS: TMenu = [
  {
    label: "Methods",
    items: [
      { label: "Timeline", path: "/timeline" },
      { label: "Play", path: "/play" },
    ],
  },
] as const;
