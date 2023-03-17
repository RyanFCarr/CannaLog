import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const proxy =
    process.env.API_PROXY || loadEnv(mode, process.cwd(), "").API_PROXY;
  console.log(proxy);
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: proxy,
          secure: false,
          rewrite: (path) => path.replace("/api", ""),
        },
      },
    },
  };
});
