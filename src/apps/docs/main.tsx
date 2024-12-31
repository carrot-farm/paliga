import { createRoot } from "react-dom/client";
import type { NavigateOptions } from "react-router-dom";
import Providers from "./app/providers";
import { BaseRoutes } from "./app/routes";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <Providers>
  //     <BaseRoutes />
  //   </Providers>
  // </StrictMode>,
  <Providers>
    <BaseRoutes />
  </Providers>,
);
