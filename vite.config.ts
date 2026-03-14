import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    react(),
    // @ts-expect-error TS2345
    babel({
      presets: [reactCompilerPreset()],
    }),
    nodePolyfills(),
  ],
});
