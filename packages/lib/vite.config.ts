import { createViteConfig } from "../../createViteConfig";
import react from "@vitejs/plugin-react-oxc";

export default createViteConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "HanghaePlusLib",
      fileName: (format) => `hanghae-plus-lib.${format}.js`,
    },
  },
});
