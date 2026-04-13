import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, ExternalLink, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { SiYoutube, SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import content from "virtual:content";
import { asset } from "@/lib/assets";

const YOUTUBE_CHANNEL_ID = "UCqjwmk9kK6l_Rl_Q8w13jEg";
const YOUTUBE_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;

const galleryImages = [
  asset("/images/gallery/jk-podcast-sandip.jpg"),
  asset("/images/gallery/jk-podcast-sunil.jpg"),
  asset("/images/gallery/team-group.jpg"),
  asset("/images/gallery/panel-discussion-1.jpg"),
  asset("/images/author/jk-anand.jpg"),
  asset("/images/author/jk-portrait.jpg"),
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function GallerySlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <div style={{ position: "relative", width: "100%", paddingBottom: "45%", background: "#f0f0f0" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={galleryImages[currentIndex]}
            alt={`Gallery photo ${currentIndex + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChevronLeft style={{ width: "20px", height: "20px" }} />
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChevronRightIcon style={{ width: "20px", height: "20px" }} />
      </button>

      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
      }}>
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: index === currentIndex ? "white" : "rgba(255,255,255,0.4)",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PodcastsPublicPage() {
  const podcasts = content.podcasts;
  const spotifyEpisodes = podcasts.filter(p => p.spotify_url);
  const firstSpotify = spotifyEpisodes[0]?.spotify_url || "";

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <Headphones className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Podcast</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            The Sales Algorithm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Podcast</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Deep conversations with top sales leaders, proven strategies, and actionable insights to help you crush your sales goals.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0">
                <SiYoutube className="w-5 h-5" />
                Subscribe on YouTube
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            {firstSpotify && (
              <a href={firstSpotify} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-[#1DB954] hover:bg-[#1aa34a] text-white border-0">
                  <SiSpotify className="w-5 h-5" />
                  Listen on Spotify
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex justify-center mb-12">
          <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-border/50">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full aspect-video relative bg-white flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <img src={asset("/images/branding/logo.png")} alt="The Sales Algorithm" className="h-24 sm:h-32 w-auto object-contain" />
              <div className="text-center px-4">
                <p className="font-bold text-lg mb-1">The Sales Algorithm Podcast</p>
                <p className="text-muted-foreground text-sm">Watch all episodes on YouTube</p>
              </div>
              <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0 mt-2">
                <SiYoutube className="w-4 h-4" />
                Watch Now
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
            <div className="p-4 border-t border-border/50 bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <SiSpotify className="w-5 h-5 text-[#1DB954]" />
                <p className="text-sm font-bold">Also available on Spotify</p>
              </div>
              <div className="space-y-2">
                {spotifyEpisodes.map((ep, idx) => (
                  <a
                    key={idx}
                    href={ep.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-border/50 hover:border-[#1DB954]/50 hover:bg-[#1DB954]/5 transition-colors group"
                  >
                    <SiSpotify className="w-4 h-4 text-[#1DB954] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">Episode {ep.episode}: {ep.title}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#1DB954] transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-12">
          <GallerySlideshow />
          <div className="mt-4 text-center">
            <Link href="/gallery">
              <Button variant="outline" size="sm">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
