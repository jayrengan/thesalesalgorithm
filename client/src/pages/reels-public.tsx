import { useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import content from "virtual:content";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ReelsPublicPage() {
  const site = content.pages.site;
  const instagramHandle = site?.instagram || "salesalgorithm";
  const instagramUrl = `https://www.instagram.com/${instagramHandle}/reels/`;

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      (window as any).instgrm?.Embeds?.process();
    }
  }, []);

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Video Reels</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Sales Tips &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Insights</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Quick, actionable sales tips and strategies from JK. Watch, learn, and level up your selling game.
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white border-0">
              <SiInstagram className="w-5 h-5" />
              Follow @{instagramHandle}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-center">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/${instagramHandle}/`}
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
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border border-border/50 bg-card/50">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
              <SiInstagram className="w-7 h-7 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold mb-1">Watch all reels on Instagram</p>
              <p className="text-xs text-muted-foreground mb-3">Follow for daily sales tips, strategies, and behind-the-scenes coaching insights.</p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <SiInstagram className="w-4 h-4" />
                  View All Reels
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
