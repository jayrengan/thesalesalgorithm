import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import content from "virtual:content";
import { asset } from "@/lib/assets";

// Parse gallery items from gallery.md body
// Format: ![alt text](/images/path.jpg)\nCaption text
// Per-image object-position overrides (1-indexed image number)
const positionOverrides: Record<number, string> = {
  5: "center 40%",
};

function parseGalleryItems(body: string): { src: string; caption: string; objectPosition?: string }[] {
  const items: { src: string; caption: string; objectPosition?: string }[] = [];
  const lines = body.split("\n");
  let imgNum = 0;
  for (let i = 0; i < lines.length; i++) {
    const imgMatch = lines[i].match(/^!\[.*?\]\((.*?)\)$/);
    if (imgMatch) {
      imgNum++;
      const src = imgMatch[1];
      const caption = (lines[i + 1] && !lines[i + 1].startsWith("!")) ? lines[i + 1].trim() : "";
      items.push({ src: asset(src), caption, objectPosition: positionOverrides[imgNum] });
    }
  }
  return items;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function GalleryPage() {
  const gallery = content.pages.gallery;
  const galleryItems = parseGalleryItems(gallery.body);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = galleryItems[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, currentIndex]);

  if (!galleryItems.length) return null;

  return (
    <div className="pt-28 pb-20 px-6 space-y-8 max-w-4xl mx-auto min-h-screen" style={{ background: "#fefcf9" }}>
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div variants={fadeInUp} className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Gallery</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-2">{gallery.title || "Gallery"}</h1>
          <p className="text-muted-foreground">{gallery.subtitle || "Photos and videos from The Sales Algorithm journey"}</p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <div style={{ position: "relative", width: "100%", paddingBottom: "56%", background: "#f0f0f0" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={currentItem.src}
                  alt={currentItem.caption}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: currentItem.objectPosition || "center 20%",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>

              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "24px 16px 16px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                color: "white",
              }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>{currentItem.caption}</p>
                <p style={{ fontSize: "12px", opacity: 0.7 }}>{currentIndex + 1} / {galleryItems.length}</p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
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
              <ChevronLeft style={{ width: "22px", height: "22px" }} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
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
              <ChevronRightIcon style={{ width: "22px", height: "22px" }} />
            </button>

            <div style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 10,
            }}>
              {galleryItems.map((_, index) => (
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
        </motion.div>
      </motion.div>
    </div>
  );
}
