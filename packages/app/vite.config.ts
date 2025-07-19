import react from "@vitejs/plugin-react-oxc";
import { createViteConfig } from "../../createViteConfig";

const base: string = process.env.NODE_ENV === "production" ? "/front_6th_chapter1-2/" : "";

export default createViteConfig({
  base,
  plugins: [react()],
});
