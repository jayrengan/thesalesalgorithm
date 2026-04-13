import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronUp,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { asset } from "@/lib/assets";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <img
            src={asset("/images/branding/logo.png")}
            alt="The Sales Algorithm"
            className="h-20 w-auto"
          />
          <div className="hidden md:flex items-center gap-6">
            <Link href="/book">
              <span className="text-sm font-medium text-muted-foreground transition-colors cursor-pointer">
                Book
              </span>
            </Link>
            <Link href="/reels">
              <span className="text-sm font-medium text-muted-foreground transition-colors cursor-pointer">
                Reels
              </span>
            </Link>
            <Link href="/podcasts">
              <span className="text-sm font-medium text-muted-foreground transition-colors cursor-pointer">
                Podcasts
              </span>
            </Link>
            <Button
              size="sm"
              onClick={() => scrollTo("contact")}
            >
              Get Started
            </Button>
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link href="/book"><span className="block text-sm font-medium text-muted-foreground">Book</span></Link>
            <Link href="/reels"><span className="block text-sm font-medium text-muted-foreground">Reels</span></Link>
            <Link href="/podcasts"><span className="block text-sm font-medium text-muted-foreground">Podcasts</span></Link>
            <Button size="sm" onClick={() => scrollTo("contact")} className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Transform Your Sales Performance
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            Master the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Science
            </span>
            <br />
            of Selling
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Proven frameworks, actionable strategies, and personalized coaching
            to help you close more deals, build stronger pipelines, and accelerate
            your revenue growth.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("contact")}
              className="min-w-[200px] text-base"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] text-base"
              >
                About JK
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-8 pt-8"
          >
            {[
              { value: "500+", label: "Sales Pros Trained" },
              { value: "47%", label: "Avg Revenue Increase" },
              { value: "12+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronUp className="w-6 h-6 text-muted-foreground rotate-180" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                About JK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Your Sales Growth
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Partner
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Rengan Jayakrishnan is an author, mentor, and sales coach specialising in go-to-market strategies and partner-led growth for B2B startups and technology companies. With 30+ years of global experience in selling software solutions and services, he advises founders and leadership teams on building scalable sales engines, high-impact channel ecosystems, and cross-border market entry strategies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              An IIT Roorkee alumnus with a management qualification from NMIMS, Rengan blends deep domain expertise with hands-on sales leadership across direct, channel, and enterprise accounts in international markets. He is the creator of "The Sales Algorithm" platform and podcast, where he distils lessons from startup founders, CXOs, and industry pioneers into practical playbooks for mid-level sales leaders, startup founders, and entrepreneurs.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/rengan-jayakrishnan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={asset("/images/author/jk-portrait.jpg")}
                alt="JK — Sales Coach & Strategist"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-bold">Sales Coach & Strategist</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Empowering sales teams to achieve extraordinary results
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: Target,
      title: "1:1 Sales Coaching",
      description:
        "Personalized coaching sessions tailored to your specific challenges, goals, and selling style. Develop skills that stick.",
      features: ["Weekly Sessions", "Custom Action Plans", "Role-Play Practice"],
    },
    {
      icon: Users,
      title: "Team Training",
      description:
        "Transform your entire sales organization with workshops and training programs designed for high-performance teams.",
      features: ["Group Workshops", "Team Assessments", "Playbook Development"],
    },
    {
      icon: BarChart3,
      title: "Sales Strategy",
      description:
        "Build a winning go-to-market strategy with data-driven frameworks that create predictable, scalable revenue.",
      features: ["Pipeline Optimization", "Process Design", "KPI Frameworks"],
    },
    {
      icon: TrendingUp,
      title: "Revenue Acceleration",
      description:
        "Identify and eliminate bottlenecks in your sales process to accelerate deal velocity and increase close rates.",
      features: ["Deal Analysis", "Conversion Optimization", "Forecasting"],
    },
  ];

  return (
    <section id="services" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Services
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
            How We Help You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Win
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-muted-foreground">
            From individual coaching to enterprise-wide transformation, we offer
            comprehensive solutions to elevate your sales performance.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="p-6 h-full hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const results = [
    { value: "47%", label: "Average Revenue Increase", description: "Across all coached clients within the first 6 months" },
    { value: "3.2x", label: "Pipeline Growth", description: "Average improvement in qualified pipeline value" },
    { value: "68%", label: "Close Rate Improvement", description: "Average increase in deal close rates for trained teams" },
    { value: "92%", label: "Client Retention", description: "Of our clients continue or expand their engagement" },
  ];

  return (
    <section id="results" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Proven Results
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Numbers That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Speak
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-muted-foreground">
            Our track record of success speaks for itself. Here's what The Sales
            Algorithm delivers for our clients.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {results.map((result) => (
            <motion.div key={result.label} variants={fadeInUp}>
              <Card className="p-6 text-center h-full">
                <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  {result.value}
                </p>
                <p className="text-sm font-semibold mb-1">{result.label}</p>
                <p className="text-xs text-muted-foreground">{result.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "VP of Sales, TechFlow Inc.",
      content:
        "JK completely transformed our sales approach. Within 3 months, our team's close rate jumped by 40%. The frameworks are practical, easy to implement, and deliver real results.",
      rating: 5,
    },
    {
      name: "Marcus Rivera",
      role: "Account Executive",
      content:
        "The 1:1 coaching sessions were a game-changer for me. I went from struggling to hit quota to becoming the top performer on my team. JK's approach is methodical yet deeply personal.",
      rating: 5,
    },
    {
      name: "Jennifer Walsh",
      role: "Director of Business Development, Apex Solutions",
      content:
        "We brought JK in for team training and the impact was immediate. Our pipeline grew 3x in the first quarter and the team's confidence skyrocketed. Highly recommend.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Testimonials
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Say
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-muted-foreground">
            Don't just take our word for it — hear from the sales leaders
            and teams who've experienced the transformation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeInUp}>
              <Card className="p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Transform
                </span>
                <br />
                Your Sales?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Take the first step toward unlocking your sales potential. Reach
                out directly and discover how The Sales Algorithm can help
                you achieve your revenue goals.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:hello@thesalesalgorithm.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    hello@thesalesalgorithm.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Book a Session</p>
                  <a href="https://topmate.io/rengan_jayakrishnan" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    topmate.io/rengan_jayakrishnan
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Available worldwide — virtual coaching</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card className="p-6 sm:p-8">
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Let's Connect</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Book a free consultation or reach out directly. JK is available for 1:1 coaching, team training, and sales strategy sessions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://topmate.io/rengan_jayakrishnan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      Book a Session
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rengan-jayakrishnan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      Connect on LinkedIn
                    </Button>
                  </a>
                </div>
                <a
                  href="mailto:hello@thesalesalgorithm.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  or email hello@thesalesalgorithm.com
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={asset("/images/branding/logo.png")}
              alt="The Sales Algorithm"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} The Sales Algorithm with JK. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ResultsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
