import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/assets";

const links = [
  { href: "/", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/podcasts", label: "Podcast" },
  { href: "/shorts", label: "Shorts" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/" || location === "/book";
  const isDark = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark
          ? "bg-transparent"
          : "bg-[#fefcf9]/95 backdrop-blur-md border-b border-[#e8ddd0]/60"
      }`}
    >
      <div className={`mx-auto h-20 sm:h-24 flex items-center justify-between transition-all duration-300 ${
        isDark ? "max-w-full px-6 sm:px-10" : "max-w-6xl px-6"
      }`}>
        <Link href="/" className="hover:opacity-80">
          <img
            src={asset(isDark ? "/images/branding/logo-white.png" : "/images/branding/logo.png")}
            alt="The Sales Algorithm"
            className="h-16 sm:h-20"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href
                  ? isDark
                    ? "text-white border-b-2 border-[#7B2D5F]"
                    : "text-[#7B2D5F] border-b-2 border-[#7B2D5F]"
                  : isDark
                    ? "text-white/90 hover:text-[#E8A020]"
                    : "text-foreground/50 hover:text-[#E8A020]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={`sm:hidden transition-colors ${
            isDark ? "text-white" : "text-foreground"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-[#fefcf9] border-b border-[#e8ddd0]/60 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-[#7B2D5F] font-semibold"
                      : "text-foreground/70 hover:text-[#E8A020]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
