// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ServerSideLazyLoadingViewport from "./lazyLoadingTable.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode> // Disabled to avoid duplicated fetch on table first render
  <ServerSideLazyLoadingViewport />
  // </StrictMode>
);
