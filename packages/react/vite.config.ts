import { createViteConfig } from "../../createViteConfig";

export default createViteConfig(
  {
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
  },
  {
    setupFiles: "./src/setupTests.ts",
  },
);
