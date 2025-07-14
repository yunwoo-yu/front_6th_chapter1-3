import { createViteConfig } from "../../createViteConfig";
import { resolve } from "path";

const base: string = process.env.NODE_ENV === "production" ? "/front_6th_chapter1-2/" : "";

export default createViteConfig({
  base,
  esbuild: {
    jsx: "transform",
    jsxFactory: "createVNode",
    jsxDev: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: "transform",
      jsxFactory: "createVNode",
      jsxDev: false,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
