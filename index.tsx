/* eslint-disable react/jsx-props-no-spreading */

import { createRoot, Root } from "react-dom/client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import "./app/globals.css";

// inject type
declare global {
  interface Window {
    EditorInit: {
      init: (config: any) => void;
    };
  }
}

// unique container ID for the editor
const EDITOR_CONTAINER_ID = "ad-editor-container";

// react root & last used config
let root: Root | null = null;

/**
 * initializes the editor into a container.
 */
export const initEditor = (config: any) => {
  let container = document.getElementById(EDITOR_CONTAINER_ID);

  if (!container) {
    container = document.createElement("div");
    container.id = EDITOR_CONTAINER_ID;
    document.body.appendChild(container);
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(<SimpleEditor {...config} />);
};

/**
 * auto-initialize if script tag is loaded with data attributes.
 */
const autoInit = () => {
  const scriptTag = document.getElementById("ad-editor");

  if (scriptTag) {
    const apiKey = scriptTag.getAttribute("ad-key") || "";
    const apiBaseUrl = scriptTag.getAttribute("ad-api-url") || "";
    const cdnDomain = scriptTag.getAttribute("ad-cdn-domain") || "";

    initEditor({
      apiKey,
      envVariables: { apiBaseUrl, cdnDomain },
    } as any);
  }
};

// expose globally for CDN usage
if (typeof window !== "undefined") {
  window.EditorInit = { init: initEditor };

  // auto-initialize if data attributes are present
  if (document.readyState === "complete") {
    autoInit();
  } else {
    window.addEventListener("load", autoInit, { once: true });
  }
}

// export for NPM usage
export { SimpleEditor };
export default SimpleEditor;
