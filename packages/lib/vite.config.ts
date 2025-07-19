import { createViteConfig } from "../../createViteConfig";
import react from "@vitejs/plugin-react-oxc";

export default createViteConfig({
  plugins: [react()],
});
