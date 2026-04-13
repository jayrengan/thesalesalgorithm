import { motion } from "framer-motion";
import content from "virtual:content";
import { asset } from "@/lib/assets";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  const about = content.pages.about;
  const site = content.pages.site;
  const paragraphs = about.body.split("\n\n").filter((p: string) => p.trim());

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              JK
            </span>
          </h1>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="md:float-left md:mr-8 md:mb-4 md:w-[280px] mb-6">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={asset(about.image || "/images/author/jk-portrait.jpg")}
                alt="Rengan Jayakrishnan"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="mt-4">
              <a
                href={site?.linkedin || "https://www.linkedin.com/in/rengan-jayakrishnan/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors w-full justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {paragraphs.map((para: string, i: number) => (
              <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{
                __html: para
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\u201c/g, '\u201c').replace(/\u201d/g, '\u201d')
                  .replace(/ — /g, ' \u2014 ')
              }} />
            ))}
          </div>
          <div className="clear-both" />
        </motion.div>
      </motion.div>
    </div>
  );
}
