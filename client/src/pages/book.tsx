import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Target, Users, Lightbulb, Mic, ExternalLink, Quote } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import content from "virtual:content";
import { asset } from "@/lib/assets";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const section1Chapters = [
  "Objective of the Book",
  "The Middle Management Plateau",
  "Budding Startup Founders and Entrepreneurs",
  "B2B Sales Cycle",
  "Creating a Sales Playbook",
  "Product Positioning",
  "Sales Approaches — Bottom-up, Top-Down, Blended",
  "Elevator Pitch",
  "Selling to Fortune 500 Companies",
  "Influence of Partners in Sales",
  "Objection Handling in Sales",
  "What Kind of a Person Are You?",
  "Sales Team Building",
  "Managing Customer Relations",
  "Customer Success Stories",
  "Key Sales Tenets",
  "Sales Negotiations and Closure",
  "Setting the Right Goals",
];

function ForewordSection({ author, title, bio, photo, text }: { author: string; title: string; bio: string; photo: string; text: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.slice(0, 3);
  const rest = text.slice(3);

  return (
    <Card className="p-6 sm:p-8 border-primary/20">
      <div className="flex items-start gap-4 mb-6">
        {photo ? (
          <img src={photo} alt={author} className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-accent/30" />
        ) : (
          <div className="w-16 h-16 rounded-full flex-shrink-0 border-2 border-accent/30 bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{author.split(' ').filter(w => w[0] === w[0].toUpperCase()).map(w => w[0]).join('')}</span>
          </div>
        )}
        <div>
          <p className="font-bold text-lg">{author}</p>
          <p className="text-sm text-primary font-medium">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{bio}</p>
        </div>
      </div>
      <Quote className="w-8 h-8 text-accent/30 mb-3" />
      <div className="space-y-4">
        {preview.map((para, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
        ))}
        {rest.length > 0 && expanded && rest.map((para, i) => (
          <p key={i + 3} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
        ))}
      </div>
      {rest.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 text-primary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read Full Foreword"}
        </Button>
      )}
    </Card>
  );
}

function MyJourneySection({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const preview = paragraphs.slice(0, 3);
  const rest = paragraphs.slice(3);

  return (
    <>
      <Quote className="w-8 h-8 text-accent/30 mb-3" />
      <div className="space-y-4">
        {preview.map((para, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
        ))}
        {expanded && rest.map((para, i) => (
          <p key={i + 3} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{para}</p>
        ))}
      </div>
      {rest.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 text-primary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read Full Journey"}
        </Button>
      )}
    </>
  );
}

// Extract foreword text from the book.md body by parsing sections
function parseForewords(body: string) {
  const sections: { author: string; title: string; bio: string; text: string[] }[] = [];
  const lines = body.split("\n");
  let currentSection: { author: string; title: string; bio: string; text: string[] } | null = null;
  let collectingBio = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## Foreword by ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { author: line.replace("## Foreword by ", ""), title: "", bio: "", text: [] };
      collectingBio = true;
    } else if (currentSection && collectingBio) {
      if (line.startsWith("**") && line.endsWith("**")) {
        currentSection.title = line.replace(/\*\*/g, "");
      } else if (line.trim() === "") {
        if (currentSection.title && currentSection.bio) collectingBio = false;
      } else if (!currentSection.bio && currentSection.title) {
        currentSection.bio = line;
      } else if (!collectingBio || (currentSection.bio && line.trim())) {
        collectingBio = false;
        if (line.trim()) currentSection.text.push(line);
      }
    } else if (currentSection && line.startsWith("## ")) {
      sections.push(currentSection);
      currentSection = null;
    } else if (currentSection && line.trim()) {
      currentSection.text.push(line);
    }
  }
  if (currentSection) sections.push(currentSection);
  return sections;
}

function parseJourney(body: string): string[] {
  const match = body.split("## My Journey with My Book");
  if (match.length < 2) return [];
  return match[1].split("\n\n").filter(p => p.trim()).map(p => p.trim());
}

function parseAfterword(body: string): { author: string; title: string; text: string } | null {
  const match = body.split("## Afterword by ");
  if (match.length < 2) return null;
  const section = match[1].split("## ")[0];
  const lines = section.split("\n").filter(l => l.trim());
  const author = lines[0] || "";
  const title = (lines[1] || "").replace(/\*\*/g, "");
  const text = lines.slice(2).join("\n\n");
  return { author, title, text };
}

export default function BookPage() {
  const book = content.pages.book;
  const podcasts = content.podcasts.filter(p => p.youtube_id);
  const forewords = parseForewords(book.body);
  const journeyParagraphs = parseJourney(book.body);
  const afterword = parseAfterword(book.body);

  const forewordPhotos: Record<string, string> = {
    "Dr Anand Deshpande": asset("/images/author/jk-anand.jpg"),
    "Dr Ashok Korwar": asset("/images/gallery/jk-with-ashok.jpg"),
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-8">
            <Card className="p-0 overflow-hidden bg-gradient-to-r from-primary/10 via-card to-accent/10 border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                <img
                  src={asset("/images/author/jk-portrait.jpg")}
                  alt="Rengan Jayakrishnan"
                  className="w-64 h-64 rounded-full object-cover object-top flex-shrink-0 border-2 border-accent/30"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {book.author || "Rengan Jayakrishnan"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {book.author_credentials || "Author · Sales Leader · Consultant · Mentor · Creator of The Sales Algorithm"}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">My Book</span>
            </div>
          </motion.div>

          <div className="mb-16">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-[360px] flex-shrink-0 mx-auto md:mx-0 space-y-4">
                  <img
                    src={asset(book.cover_image || "/images/book/cover.jpg")}
                    alt="The Sales Algorithm - Book Cover"
                    className="w-full h-auto rounded-lg shadow-lg border border-border/50"
                  />
                </div>
                <div className="space-y-6 flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    The Sales{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Algorithm</span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A comprehensive guide for budding startup founders and entrepreneurs who want to master the art and science of B2B sales. Drawing from decades of real-world experience in software sales, this book provides a proven framework to navigate the complex world of enterprise selling — from crafting your first pitch to closing Fortune 500 deals.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're stuck in the middle management plateau or just starting your entrepreneurial journey, this book gives you the playbook, strategies, and mindset to build, scale, and lead a world-class sales operation.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Startup Founders</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/20">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Entrepreneurs</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Corporate Sales Managers</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/20">
                      <Target className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Sales Leaders</span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="text-sm px-4 py-1.5">{book.status || "Coming Soon"}</Badge>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold">Forewords</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-primary/20 flex flex-col">
                <img src={asset("/images/gallery/jk-with-ashok.jpg")} alt="Dr. Ashok Korwar" className="w-full h-80 object-cover object-[center_15%]" />
                <div className="p-5 bg-primary/5 flex-1">
                  <p className="font-bold text-sm mb-1">Dr. Ashok Korwar</p>
                  <p className="text-xs text-muted-foreground mb-3">Former Professor, IIM Ahmedabad</p>
                  <p className="text-sm font-semibold italic leading-relaxed">
                    "Sales is the single most important function in any company, because, without sales, you have nothing."
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-accent/20 flex flex-col">
                <img src={asset("/images/author/jk-anand.jpg")} alt="Dr. Anand Deshpande" className="w-full h-80 object-cover object-center" />
                <div className="p-5 bg-accent/5 flex-1">
                  <p className="font-bold text-sm mb-1">Dr. Anand Deshpande</p>
                  <p className="text-xs text-muted-foreground mb-3">Founder & Chairman, Persistent Systems</p>
                  <p className="text-sm font-semibold italic leading-relaxed">
                    "...a body of practical wisdom rarely seen written down so clearly."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold">Section 1: The Sales Playbook</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {section1Chapters.slice(0, 7).map((chapter, index) => (
                <Card key={index} className="p-3 flex items-start gap-2 h-full">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs font-medium leading-snug">{chapter}</p>
                </Card>
              ))}
              <Card className="p-3 flex items-center gap-2 h-full border-dashed border-primary/30 bg-primary/5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">+</span>
                <p className="text-xs font-medium text-primary italic">and more...</p>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
              <h2 className="text-2xl font-bold">Section 2: Startup Sales Challenges</h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-4">Excerpts from podcast interviews with industry leaders and entrepreneurs</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {podcasts.map((podcast, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <a href={podcast.youtube_url} target="_blank" rel="noopener noreferrer" className="block group">
                    <Card className="overflow-hidden transition-colors group-hover:border-accent/50">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${podcast.youtube_id}/mqdefault.jpg`}
                          alt={podcast.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                            <Mic className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{podcast.title}</p>
                          <p className="text-xs text-muted-foreground">Podcast Interview</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {afterword && (
            <motion.div variants={fadeInUp} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
                <h2 className="text-2xl font-bold">Afterword</h2>
              </div>
              <Card className="p-6 sm:p-8 border-primary/20">
                <div className="flex items-start gap-4 mb-4">
                  <img src={asset("/images/gallery/jk-with-sandip.jpg")} alt={afterword.author} className="w-32 h-32 rounded-full object-cover object-top flex-shrink-0 border-2 border-accent/30" />
                  <div>
                    <p className="font-bold text-base">{afterword.author}</p>
                    <p className="text-sm text-muted-foreground">{afterword.title}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Quote className="w-6 h-6 text-accent/40 flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground leading-relaxed italic">
                    {afterword.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          <motion.div variants={fadeInUp} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold">My Journey with My Book</h2>
            </div>
            <Card className="p-6 sm:p-8 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <img src={asset("/images/author/jk-portrait.jpg")} alt="Rengan Jayakrishnan" className="w-64 h-64 rounded-full object-cover object-top flex-shrink-0 border-2 border-accent/30" />
                <div>
                  <p className="font-bold text-lg">Rengan Jayakrishnan</p>
                  <p className="text-sm text-primary font-medium">Author, The Sales Algorithm</p>
                </div>
              </div>
              <MyJourneySection paragraphs={journeyParagraphs} />
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Stay Tuned</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                "The Sales Algorithm" is coming soon. Follow JK on social media for updates on the release date and exclusive previews.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/reels">
                  <Button variant="outline">Watch Reels</Button>
                </Link>
                <Link href="/podcasts">
                  <Button>Listen to Podcast</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.div>
    </div>
  );
}
