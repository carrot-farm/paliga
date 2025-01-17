import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { NavigateOptions } from "react-router-dom";
import Providers from "./app/providers";
import { BaseRoutes } from "./app/routes";

import "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism-tomorrow.css";

import "@paliga/core/src/dev-tool.css";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BaseRoutes />
    </Providers>
  </StrictMode>,
);
