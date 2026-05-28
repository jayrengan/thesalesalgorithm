import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play, ArrowUpRight } from "lucide-react";
import { SiYoutube, SiSpotify, SiInstagram } from "react-icons/si";
import { Link } from "wouter";
import content from "virtual:content";
import { asset } from "@/lib/assets";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 1.6, delay: delay + 0.3, ease: [0.08, 0.82, 0.17, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const buyLinks = [
  { label: "Notion Press", href: "https://notionpress.com/in/read/the-sales-algorithm" },
  { label: "Flipkart", href: "https://www.flipkart.com/sales-algorithm-makes-great-products-sell-playbook-startup-founders-professionals/p/itm3bb1ea2bcdde1?pid=9798902967835&affid=editornoti" },
  { label: "Amazon.in", href: "https://amzn.in/d/09pUnIbj" },
  { label: "Amazon.com", href: "https://a.co/d/0394Cfsi" },
  { label: "Amazon.co.uk", href: "https://amzn.eu/d/0grKFk5T" },
];


function OrderCTA() {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <a
        href="https://notionpress.com/in/read/the-sales-algorithm"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase bg-[#E8A020] text-white hover:bg-[#d4911a] transition-colors"
      >
        Order Now <ArrowUpRight className="w-4 h-4" />
      </a>
      <p className="text-xs text-foreground/40 tracking-[0.1em] uppercase mt-1">
        Also on{" "}&nbsp;
        {buyLinks.filter(l => l.label !== "Notion Press").map((link, i, arr) => (
          <span key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-[#E8A020] transition-colors underline underline-offset-2">{link.label}</a>
            {i < arr.length - 1 && " · "}
          </span>
        ))}
      </p>
    </div>
  );
}

const highlights = [
  { num: "01", title: "The B2B Sales Cycle", desc: "Understanding the full arc from first touch to close" },
  { num: "02", title: "Creating a Sales Playbook", desc: "Building repeatable frameworks that scale" },
  { num: "03", title: "Product Positioning", desc: "Framing your product for the right buyers" },
  { num: "04", title: "Selling to Fortune 500s", desc: "Enterprise deals, long cycles, high stakes" },
  { num: "05", title: "Sales Negotiations & Closure", desc: "From objection handling to getting the signature" },
];


export default function LandingPage() {
  const book = content.pages.book;
  const site = content.pages.site;
  const podcasts = content.podcasts.filter((p: any) => p.youtube_id);
  const introText = book.body.split("## ")[0].trim();
  const introParagraphs = introText
    .split("\n\n")
    .filter((p: string) => p.trim());

  // Scroll gate: hold at the title reveal on first downward scroll, then release
  const gateRef = useRef({ locked: false, passed: false, timer: 0 });
  useEffect(() => {
    const lockPoint = window.innerHeight * 0.5;
    const handler = () => {
      const y = window.scrollY;
      const gate = gateRef.current;
      if (gate.passed) return;
      if (!gate.locked && y >= lockPoint) {
        gate.locked = true;
        window.scrollTo({ top: lockPoint });
        // Release gate after a short hold
        gate.timer = window.setTimeout(() => {
          gate.passed = true;
        }, 800);
      }
      if (gate.locked && !gate.passed) {
        window.scrollTo({ top: lockPoint });
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      clearTimeout(gateRef.current.timer);
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleOpacity = useTransform(scrollYProgress, [0.01, 0.12], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.01, 0.12], [40, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.06]);
  const overlayOpacity = useTransform(scrollYProgress, [0.0, 0.1], [0, 0.75]);

  return (
    <div style={{ background: "#fefcf9" }}>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-[200vh]"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Full-bleed mockup photo */}
          <motion.img
            src={asset("/images/book/hero-mockup.jpg")}
            alt="The Sales Algorithm"
            className="w-full h-full object-cover"
            style={{ scale: imgScale, objectPosition: "70% 40%" }}
          />

          {/* Top gradient for nav readability */}
          <div
            className="absolute top-0 left-0 right-0 h-32 z-10"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)" }}
          />

          {/* Warm overlay that builds as you scroll */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "#2d1040", opacity: overlayOpacity }}
          />

          {/* Title that reveals on scroll */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-8"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <p className="text-xs sm:text-base tracking-[0.3em] uppercase text-white/70 mb-3 sm:mb-4 font-medium">
              A book by {book.author}
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[1.05] mb-4 sm:mb-6" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
              The Sales
              <br />
              Algorithm
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-lg mb-6 sm:mb-8 font-medium px-2">
              {book.subtitle.split(/(?=Startup)/)[0]}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {book.subtitle.split(/(?=Startup)/)[1]}
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://notionpress.com/in/read/the-sales-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase bg-white/90 text-[#7B2D5F] hover:bg-[#E8A020] hover:text-white transition-colors"
              >
                Order Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-white/50 tracking-[0.1em] uppercase mt-1">
                Also on{" "}&nbsp;
                {buyLinks.filter(l => l.label !== "Notion Press").map((link, i, arr) => (
                  <span key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#E8A020] transition-colors underline underline-offset-2">{link.label}</a>
                    {i < arr.length - 1 && " · "}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </div>
      </section>

      {/* ─── PRAISE ─── */}
      <section className="py-24 sm:py-32 px-6" style={{ background: "#fdf5ed" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
              Forewords
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 text-center">
              Praise for The Sales Algorithm
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <Reveal className="h-full">
              <div className="flex flex-col items-center text-center h-full">
                <img
                  src={asset("/images/author/jk-anand.jpg")}
                  alt="Dr. Anand Deshpande"
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover mb-6 shadow-md flex-shrink-0"
                  style={{ objectPosition: "center 40%" }}
                />
                <p className="text-lg leading-relaxed text-foreground/60 flex-1 flex items-center max-w-[280px]" style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}>
                  "A body of practical wisdom rarely seen written down so
                  clearly."
                </p>
                <div className="mt-6">
                  <p className="text-sm font-bold" style={{ fontFamily: "'Lora', serif" }}>Dr. Anand Deshpande</p>
                  <p className="text-xs text-foreground/70 mt-0.5" style={{ fontFamily: "'Lora', serif" }}>
                    Founder & Chairman, Persistent Systems
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="flex flex-col items-center text-center h-full">
                <img
                  src={asset("/images/gallery/jk-with-ashok.jpg")}
                  alt="Dr. Ashok Korwar"
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover object-top mb-6 shadow-md flex-shrink-0"
                />
                <p className="text-lg leading-relaxed text-foreground/60 flex-1 flex items-center max-w-[300px]" style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}>
                  "Sales is the single most important function in any company."
                </p>
                <div className="mt-6">
                  <p className="text-sm font-bold" style={{ fontFamily: "'Lora', serif" }}>Dr. Ashok Korwar</p>
                  <p className="text-xs text-foreground/70 mt-0.5" style={{ fontFamily: "'Lora', serif" }}>
                    Former Professor, IIM Ahmedabad
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE BOOK ─── */}
      <section className="py-24 sm:py-32 px-6" style={{ background: "#fefcf9" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
            <div className="max-w-3xl">
              <Reveal>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  About the Book
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">
                  From first pitch to Fortune 500 deals
                </h2>
              </Reveal>
              {introParagraphs.map((para: string, i: number) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className="text-lg leading-relaxed text-foreground/70 mb-6">
                    {para}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2 mt-10">
                  {(book.audiences || []).map((audience: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full text-sm text-foreground/50"
                      style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="flex flex-col items-center md:mt-40">
                <img
                  src={asset("/images/book/JK-11.jpg")}
                  alt="The Sales Algorithm — front and back cover"
                  className="w-full md:w-96 lg:w-[28rem] rounded-lg shadow-lg object-cover"
                />
                <div className="mt-6">
                  <OrderCTA />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── BOOK GALLERY COLLAGE ─── */}
      <section className="py-16 sm:py-20 px-6" style={{ background: "#fdf5ed" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[140px]">
              {/* JK-8: landscape — 4 books upright, span 2 cols */}
              <img src={asset("/images/book/JK-8.jpg")} alt="Books standing upright" className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg" />
              {/* JK-6: portrait — flat lay, pull down within frame */}
              <img src={asset("/images/book/JK-6.jpg")} alt="Book covers flat lay" className="row-span-2 w-full h-full object-cover rounded-lg" style={{ objectPosition: "center 30%" }} />
              {/* JK-15: landscape — stacked copies */}
              <img src={asset("/images/book/JK-15.jpg")} alt="Stacked copies" className="w-full h-full object-cover rounded-lg" />
              {/* JK-7: landscape — books on table, show more of the image */}
              <img src={asset("/images/book/JK-7.jpg")} alt="Books spread on table" className="w-full h-full object-cover rounded-lg" style={{ objectPosition: "center 30%" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ─── */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-6" style={{ background: "#fefcf9" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              What's Inside
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              18 chapters across two sections
            </h2>
            <p className="text-foreground/60 mb-12">
              Frameworks, strategies, and real-world playbooks covering team building, customer success, partner influence, and much more.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((h) => (
                <div
                  key={h.num}
                  className="p-5 rounded-lg"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <span className="font-mono text-sm block mb-2" style={{ color: "rgba(0,0,0,0.15)" }}>
                    {h.num}
                  </span>
                  <p className="text-base sm:text-lg font-semibold mb-1">{h.title}</p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
              <div
                className="p-5 rounded-lg border border-dashed"
                style={{ background: "transparent", borderColor: "rgba(0,0,0,0.1)" }}
              >
                <span className="font-mono text-sm block mb-2" style={{ color: "rgba(0,0,0,0.12)" }}>
                  ...
                </span>
                <p className="text-base sm:text-lg font-semibold mb-1 text-foreground/50">And much more</p>
                <p className="text-sm sm:text-base text-muted-foreground/70 leading-relaxed">
                  Team building, customer success, goal setting, partner influence, and more
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <OrderCTA />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE PODCAST ─── */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-6" style={{ background: "#fefcf9" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              The Podcast
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              Conversations behind the book
            </h2>
            <p className="text-muted-foreground mb-12 max-w-xl">
              Hear directly from the founders, investors, and leaders whose
              experiences shaped this book.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {podcasts.slice(0, 6).map((podcast: any, i: number) => (
                <a
                  key={i}
                  href={podcast.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3" style={{ background: "rgba(0,0,0,0.04)" }}>
                    <img
                      src={`https://img.youtube.com/vi/${podcast.youtube_id}/mqdefault.jpg`}
                      alt={podcast.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Play
                          className="w-4 h-4 text-foreground ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-medium group-hover:text-[#E8A020] transition-colors">
                    Ep {podcast.episode}: {podcast.title}
                  </p>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={site.youtube_channel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <SiYoutube className="w-4 h-4 text-[#FF0000]" />
                YouTube
              </a>
              {podcasts[0]?.spotify_url && (
                <a
                  href={podcasts[0].spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <SiSpotify className="w-4 h-4 text-[#1DB954]" />
                  Spotify
                </a>
              )}
              {site.instagram && (
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <SiInstagram className="w-4 h-4 text-[#E4405F]" />
                  Instagram
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE JOURNEY ─── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-6" style={{ background: "#fdf5ed" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Behind the Book
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10">
              The journey to The Sales Algorithm
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-foreground/70 mb-6">
              From early January 2025, what began as an idea gradually took shape into this book. Family played a pivotal role: Jayashree's constant encouragement, Kshitij's suggestion to journal coaching sessions (which became the backbone of the content), Baani's advice to enrich it with real-life experiences, and Shashvat's proposal for the title and the "Try It Out" sections that shaped it into a practical guide.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={asset("/images/book/JK-20.jpg")}
              alt="Reading The Sales Algorithm"
              className="w-full sm:w-2/3 rounded-lg shadow-md mb-8 mx-auto"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lg leading-relaxed text-foreground/70 mb-6">
              A major turning point came with the launch of The Sales Algorithm Podcast. Conversations with founders like Sandip Chintawar, Kshiteesh Deshmukh, Kaustubh Deshmukh, and Sunil Jalihal enriched the narrative. Panel discussions with Ashok Korwar and Ram Pazhayannur, and sessions on AI in sales with Sandip and Udit Agarwal, added new dimensions.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed text-foreground/70">
              The opportunity to interview Anand Deshpande, whose insights were deeply aligned with the book's core ideas, was a defining moment. This journey has been deeply fulfilling, and this book is the result of countless conversations, late nights, and a belief that sales can be taught, structured, and mastered.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <OrderCTA />
          </Reveal>
        </div>
      </section>

      {/* ─── THE AUTHOR ─── */}
      <section className="pt-12 sm:pt-16 pb-24 sm:pb-32 px-6" style={{ background: "#fefcf9" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              The Author
            </p>
            <img
              src={asset("/images/book/IMG_1730.jpg")}
              alt="Rengan Jayakrishnan"
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover object-top mx-auto mb-6 shadow-lg"
              style={{ border: "3px solid #fff" }}
            />
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-2">
              Rengan Jayakrishnan
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Author · Sales Leader · Consultant · Mentor
            </p>
            <p className="text-lg leading-relaxed text-foreground/60 mb-8 max-w-xl mx-auto">
              With 30+ years of global experience in B2B software sales, JK
              advises startup founders and leadership teams on building scalable
              sales engines, channel ecosystems, and go-to-market strategies. An
              IIT Roorkee alumnus, he blends deep domain expertise with hands-on
              sales leadership.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/60 hover:text-foreground transition-colors"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                Full bio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
