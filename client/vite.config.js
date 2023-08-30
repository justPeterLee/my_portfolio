import { defineConfig } from "vite";

export default {
  //   root: "src/",
  //   publicDir: "../public/",
  //   base: "./",
  server: {
    proxy: {
      "/api/v1": "http://localhost:5001/",
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
};
