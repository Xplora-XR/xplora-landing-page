"use client";

import { useEffect } from "react";
import type { HTMLAttributes } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": HTMLAttributes<HTMLElement> & Record<string, unknown>;
    }
  }
}

/** About: the AR glasses we use, as an interactive 3D model. */
export default function GlassesModel() {
  // model-viewer registers a custom element and touches `window`, so load it only in the browser.
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src="/models/vr_glasses.glb"
      alt="Óculos de realidade aumentada usados pela Xplora"
      camera-controls=""
      auto-rotate=""
      auto-rotate-delay="0"
      rotation-per-second="20deg"
      disable-zoom=""
      interaction-prompt="none"
      shadow-intensity="1"
      exposure="1.1"
      loading="lazy"
      className="absolute inset-0 size-full [--poster-color:transparent]"
    />
  );
}
