import { useEffect } from "react";
import { motion } from "framer-motion";
import { SiInstagram } from "react-icons/si";
import content from "virtual:content";

export default function ShortsPage() {
  const site = content.pages.site;
  const handle = site?.instagram || "salesalgorithm";

  useEffect(() => {
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm?.Embeds?.process();
    }
  }, []);

  return (
    <div style={{ background: "#fefcf9" }} className="min-h-screen">
      <motion.div
        className="pt-28 pb-20 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Shorts
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
          Quick sales tips, daily
        </h1>
        <p className="text-foreground/60 mb-8 max-w-xl">
          Bite-sized strategies, coaching insights, and behind-the-scenes
          content. Follow on Instagram for daily actionable sales advice.
        </p>

        <div className="mb-12">
          <a
            href={`https://instagram.com/${handle}/reels/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <SiInstagram className="w-4 h-4 text-[#E4405F]" />
            @{handle}
          </a>
        </div>

        {/* Instagram embed */}
        <div className="flex justify-center">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/${handle}/`}
            data-instgrm-version="14"
            style={{
              background: "transparent",
              border: 0,
              margin: "0 auto",
              maxWidth: "540px",
              minWidth: "326px",
              width: "100%",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
