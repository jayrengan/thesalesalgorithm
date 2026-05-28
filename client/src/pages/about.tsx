import { motion } from "framer-motion";
import content from "virtual:content";
import { asset } from "@/lib/assets";

export default function AboutPage() {
  const about = content.pages.about;
  const site = content.pages.site;
  const paragraphs = about.body.split("\n\n").filter((p: string) => p.trim());

  return (
    <div style={{ background: "#fefcf9" }} className="min-h-screen">
      <motion.div
        className="pt-28 pb-20 px-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          About
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-12">
          Rengan Jayakrishnan
        </h1>

        <div className="md:float-left md:mr-8 md:mb-4 md:w-[280px] mb-8">
          <img
            src={asset(about.image || "/images/author/jk-portrait.jpg")}
            alt="Rengan Jayakrishnan"
            className="w-full h-auto rounded-xl"
          />
          <div className="mt-4 space-y-2">
            <a
              href={
                site?.linkedin ||
                "https://www.linkedin.com/in/rengan-jayakrishnan/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors w-full justify-center"
              style={{ border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <svg
                className="w-4 h-4 text-[#0A66C2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://topmate.io/rengan_jayakrishnan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors w-full justify-center"
              style={{ border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 47 46"
                fill="none"
              >
                <circle r="22.5" transform="matrix(1 0 0 -1 23.6152 23)" fill="#E44332" />
                <path d="M33.0038 29.6411C31.5707 31.6672 29.5206 33.1752 27.1598 33.9401C24.7989 34.705 22.254 34.6857 19.905 33.8851C17.5561 33.0844 15.5291 31.5454 14.1269 29.4978C12.7247 27.4503 12.0225 25.0041 12.1251 22.5246C12.2277 20.045 13.1296 17.6652 14.6962 15.7405C16.2627 13.8158 18.4099 12.4495 20.817 11.8456C23.224 11.2418 25.7619 11.4328 28.0515 12.3901C30.341 13.3474 32.2595 15.0197 33.5204 17.1572L23.6152 23L33.0038 29.6411Z" fill="#FEF7F7" />
              </svg>
              Topmate
            </a>
          </div>
        </div>

        <div className="space-y-6">
          {paragraphs.map((para: string, i: number) => (
            <p
              key={i}
              className="leading-relaxed text-foreground/70"
              dangerouslySetInnerHTML={{
                __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </div>
        <div className="clear-both" />
      </motion.div>
    </div>
  );
}
