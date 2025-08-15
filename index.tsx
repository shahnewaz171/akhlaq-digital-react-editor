declare global {
  interface Window {
    ChatKey: {
      init: (config: any) => void;
    };
  }
}

/* eslint-disable react/jsx-props-no-spreading */

import { createRoot } from "react-dom/client";
import "./app/globals.css";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

// Method for loading the editor via JavaScript
export const initChatKey = (config: any) => {
  // Create container for the editor if it doesn't exist
  let container = document.getElementById("akhlaqdigital-editor-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "ad-editor";
    document.body.appendChild(container);
  }

  // Render the editor
  const root = createRoot(container);
  root.render(<SimpleEditor {...config} />);
};

// Auto-initialize if script is loaded with data attributes
const autoInit = () => {
  const scriptTag = document.getElementById("ad-editor");
  if (scriptTag) {
    const apiKey = scriptTag.getAttribute("ad-key");
    const apiBaseUrl = scriptTag.getAttribute("ad-api-url");
    const cdnDomain = scriptTag.getAttribute("ad-cdn-domain");
    initChatKey({
      apiKey,
      envVariables: {
        apiBaseUrl,
        cdnDomain,
      },
    });
  }
};

// Expose the init function globally for CDN usage
if (typeof window !== "undefined") {
  window.ChatKey = {
    init: initChatKey,
  };

  // Auto-initialize if data attributes are present
  if (document.readyState === "complete") {
    autoInit();
  } else {
    window.addEventListener("load", autoInit);
  }
}

// Export components for NPM usage
export { SimpleEditor };
export default SimpleEditor;
