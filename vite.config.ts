import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function contentPlugin() {
  const virtualModuleId = "virtual:content";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const contentDir = path.resolve(__dirname, "content");

  function loadContent() {
    const pages: Record<string, any> = {};
    const podcasts: any[] = [];
    const reels: any[] = [];

    for (const file of fs.readdirSync(contentDir)) {
      if (!file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      pages[slug] = { ...data, body: content.trim() };
    }

    const podcastDir = path.join(contentDir, "podcasts");
    if (fs.existsSync(podcastDir)) {
      for (const file of fs.readdirSync(podcastDir).sort()) {
        if (!file.endsWith(".md")) continue;
        const raw = fs.readFileSync(path.join(podcastDir, file), "utf-8");
        const { data, content } = matter(raw);
        if (data.published === false) continue;
        podcasts.push({ ...data, body: content.trim(), slug: file.replace(/\.md$/, "") });
      }
    }

    const reelDir = path.join(contentDir, "reels");
    if (fs.existsSync(reelDir)) {
      for (const file of fs.readdirSync(reelDir).sort()) {
        if (!file.endsWith(".md")) continue;
        const raw = fs.readFileSync(path.join(reelDir, file), "utf-8");
        const { data, content } = matter(raw);
        if (data.published === false) continue;
        reels.push({ ...data, body: content.trim(), slug: file.replace(/\.md$/, "") });
      }
    }

    return { pages, podcasts, reels };
  }

  return {
    name: "vite-plugin-content",
    resolveId(id: string) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const content = loadContent();
        return `export default ${JSON.stringify(content)};`;
      }
    },
    handleHotUpdate({ file, server }: { file: string; server: any }) {
      if (file.startsWith(contentDir)) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      }
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), contentPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
