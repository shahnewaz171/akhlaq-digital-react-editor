import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import graphql from "@rollup/plugin-graphql";

export default () => {
  const env = loadEnv("", process.cwd());

  return defineConfig({
    plugins: [react(), cssInjectedByJsPlugin(), graphql()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, "index.tsx"),
        name: "AkhlaqDigitalEditor",
        fileName: () => "ad-editor.js",
      },
      rollupOptions: {
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          exports: "named",
        },
      },
    },
    define: {
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
      __CDN_DOMAIN__: JSON.stringify(env.VITE_CDN_DOMAIN),
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
    },
  });
};
