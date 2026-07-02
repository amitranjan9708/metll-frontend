import { Link } from "react-router-dom";
import { useEffect, useRef, useState, forwardRef } from "react";
import AnimatedCharactersLoginPage from "@/components/ui/animated-characters-login-page";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Smartphone, Star } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Lottie from "lottie-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.metll.app";

// Emil-style easing curves
const EASE_OUT_STRONG: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_IN_OUT_STRONG: [number, number, number, number] = [0.77, 0, 0.175, 1];

// ─── Preloader ────────────────────────────────────────────────────────────────

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2400);
    const completeTimer = setTimeout(() => onComplete(), 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#09090b]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.02 : 1,
          y: isExiting ? -10 : 0,
        }}
        transition={{ duration: 0.5, ease: EASE_OUT_STRONG }}
        className="flex flex-col items-center"
      >

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white z-10"
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_STRONG }}
        >
          MetLL
        </motion.h1>

        <motion.div
          className="flex gap-1.5 mt-5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Store Buttons Component ──────────────────────────────────────────────────

function StoreButtons({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}>
      {/* Google Play Button */}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 active:scale-[0.97] ${isDark
          ? "bg-white text-[#09090b] border-white/20 hover:bg-white/90"
          : "bg-[#09090b] text-white border-white/10 hover:bg-[#09090b]/90"
          }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <svg viewBox="30 336.7 120.9 129.2" className="w-6 h-6 shrink-0">
          <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
          <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1z" />
          <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
          <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] font-medium leading-none opacity-70 uppercase tracking-wider">Get it on</span>
          <span className="text-sm font-bold leading-tight mt-0.5">Google Play</span>
        </div>
      </a>

      {/* iOS Coming Soon Button */}
      <div
        className={`relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 cursor-default ${isDark
          ? "bg-white/5 text-white/50 border-white/10"
          : "bg-[#09090b]/5 text-[#09090b]/40 border-[#09090b]/10"
          }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <svg viewBox="0 0 384 512" className="w-5 h-5 shrink-0 opacity-50">
          <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.3C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-[10px] font-medium leading-none opacity-60 uppercase tracking-wider">Coming Soon</span>
          <span className="text-sm font-bold leading-tight mt-0.5">App Store</span>
        </div>
        {/* Coming Soon Badge */}
        <Badge variant="secondary" className="absolute -top-2 -right-2 text-[9px] px-1.5 py-0.5 bg-amber-500/90 text-white border-0 font-semibold">
          Soon
        </Badge>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const downloadRef = useRef<HTMLElement>(null);
  const loginRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SEOHead
        title="MetLL - Confess Anonymously & Date | Anonymous Confession App"
        description="Download MetLL on Google Play. Confess your secret crush anonymously from school, college, office, or anywhere. When mutual feelings are detected, we reveal the match so you can connect and date."
        keywords="anonymous confession, dating app, secret crush, matchmaking, love, mutual feelings, crush finder, download MetLL, Google Play"
      />

      <div className="w-full bg-[#09090b] relative">
        <Header
          onHomeClick={() => heroRef.current?.scrollIntoView({ behavior: "smooth" })}
          onContactClick={() => footerRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
        <HeroSection ref={heroRef} />
        <FeaturesSection ref={featuresRef} />
        <TestimonialsSection ref={testimonialsRef} />
        <AppDownloadSection ref={downloadRef} />
        <FAQSection ref={faqRef} />
        <AuthSection ref={loginRef} />
        <FooterSection ref={footerRef} />
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  onHomeClick,
  onContactClick,
}: {
  onHomeClick: () => void;
  onContactClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navBg, setNavBg] = useState("bg-white");
  const [navText, setNavText] = useState("text-[#09090b]");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = document.querySelectorAll("section");
      let activeSection: HTMLElement | null = null;

      for (const section of Array.from(sections)) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          activeSection = section;
          break;
        }
      }

      if (activeSection) {
        setNavBg(activeSection.getAttribute("data-nav-bg") || "bg-white");
        setNavText(activeSection.getAttribute("data-nav-text") || "text-[#09090b]");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
          : `${navBg} md:${scrolled ? "bg-[#09090b]/80" : "bg-transparent"} ${scrolled ? 'backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.3)] border-b border-white/[0.06]' : 'border-b border-transparent'}`
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl md:text-3xl font-semibold transition-opacity duration-200 hover:opacity-80 active:scale-[0.97] ${mobileMenuOpen ? "text-white" : `${navText} md:text-white`
            }`}
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
        >
          MetLL
        </Link>

        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onHomeClick(); }}
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <Link to="/about" className="hover:text-white transition-colors duration-200">
            About
          </Link>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onContactClick(); }}
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#09090b] hover:bg-white/90 transition-all duration-200 active:scale-[0.97]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Download App
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 transition-colors duration-200 ${mobileMenuOpen ? "text-white/70 hover:text-white" : `${navText} hover:opacity-80`
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_STRONG }}
            className="md:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <nav
              className="flex flex-col gap-1 px-4 py-3 text-white/70"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <a href="#" className="py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200" onClick={(e) => { e.preventDefault(); onHomeClick(); setMobileMenuOpen(false); }}>
                Home
              </a>
              <Link to="/about" className="py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <a href="#" className="py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200" onClick={(e) => { e.preventDefault(); onContactClick(); setMobileMenuOpen(false); }}>
                Contact
              </a>
              <Separator className="my-2 bg-white/[0.06]" />
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-white text-[#09090b] font-semibold text-sm active:scale-[0.97] transition-transform duration-150"
              >
                <Smartphone className="w-4 h-4" />
                Download on Google Play
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      data-nav-bg="bg-white"
      data-nav-text="text-[#09090b]"
      className="relative w-full min-h-0 md:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-[48px] md:pt-0 bg-[#A4B8E7]"
    >
      {/* DESKTOP: Full-bleed background image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img
          src="/sst.jpg"
          alt="Couple connecting"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* MOBILE: Stacked images */}
      <div className="md:hidden relative z-10 flex flex-col overflow-hidden w-full">
        <img src="/Rectangle 21.png" alt="" className="w-full h-auto block object-cover" style={{ minWidth: "100%" }} />
        <img src="/Component 9.svg" alt="" className="w-full h-auto block object-cover -mt-1" style={{ minWidth: "100%" }} />

        {/* Mobile text overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">

          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight text-white text-center drop-shadow-lg"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            Confess. Connect. Date.
          </h1>

          <p
            className="text-sm sm:text-base font-normal text-white/90 text-center mt-3 max-w-[300px] drop-shadow-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Confess Anonymously, we match when it's mutual.
          </p>

          <div className="mt-6">
            <StoreButtons variant="dark" className="justify-center" />
          </div>
        </div>
      </div>

      {/* DESKTOP: Main Content */}
      <div className="hidden md:flex relative z-20 flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 mt-16">
        {/* Announcement Badge */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_STRONG }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl"
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
        >
          Confess. Connect. Date.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT_STRONG }}
          className="text-base sm:text-lg md:text-xl font-medium text-white/95 mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Confess Anonymously, we match when it's mutual.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_STRONG }}
          className="mt-10 md:mt-12"
        >
          <StoreButtons variant="dark" className="justify-center" />
        </motion.div>


      </div>
    </section>
  );
});

// ─── Features Section ─────────────────────────────────────────────────────────

const features = [
  {
    step: "01",
    title: "Confess Anonymously",
    description:
      "Pour out the real feelings for your crush — school, college, office, or anywhere. Your identity stays hidden until feelings are mutual.",
    image: "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=900&auto=format&fit=crop&q=60",
  },
  {
    step: "02",
    title: "AI Memory Match",
    description:
      "Our intelligent algorithm works behind the scenes. When someone confesses about you too, that's when the magic happens.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=60",
  },
  {
    step: "03",
    title: "Crushes at a Locality",
    description:
      "When you're at the same location, anonymously confess to your crush. If they confess back while nearby — instant match.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=60",
  },
  {
    step: "04",
    title: "Live Confession",
    description:
      "Spot someone at a café, on the train, or anywhere in public. Confess right there — no awkward approaches needed.",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&auto=format&fit=crop&q=60",
  },
];

const FeaturesSection = forwardRef<HTMLElement>((_, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => { setCurrentIndex((prev) => (prev + 1) % features.length); setIsAutoPlaying(false); };
  const prevSlide = () => { setCurrentIndex((prev) => (prev - 1 + features.length) % features.length); setIsAutoPlaying(false); };

  const feature = features[currentIndex];

  return (
    <section ref={ref} data-nav-bg="bg-white" data-nav-text="text-[#09090b]" className="relative bg-white py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Seamless curved separator from hero */}
      <div className="absolute -top-1 left-0 right-0 pointer-events-none z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 0H1440V40C1440 62.0914 1421.09 80 1399 80H41C18.9086 80 0 62.0914 0 40V0Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
          >
            <p
              className="text-[#09090b]/40 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              How It Works
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#09090b] tracking-tight"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              Simple Steps
              <br />
              <span className="text-[#09090b]/30">to Love</span>
            </h2>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full w-10 h-10 border-[#09090b]/10 text-[#09090b]/60 hover:bg-[#09090b]/5 hover:text-[#09090b] transition-all duration-200 active:scale-[0.95]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="rounded-full w-10 h-10 border-[#09090b]/10 text-[#09090b]/60 hover:bg-[#09090b]/5 hover:text-[#09090b] transition-all duration-200 active:scale-[0.95]"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full w-10 h-10 border-[#09090b]/10 text-[#09090b]/60 hover:bg-[#09090b]/5 hover:text-[#09090b] transition-all duration-200 active:scale-[0.95]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Feature Card */}
        <div className="relative min-h-[480px] md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT_STRONG }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Text */}
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <span
                    className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#09090b]/[0.06] select-none"
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                  >
                    {feature.step}
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-rose-400 to-transparent rounded-full" />
                </div>

                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#09090b] leading-[1.1] tracking-tight"
                  style={{ fontFamily: "'Novaklasse', sans-serif" }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-base md:text-lg text-[#09090b]/50 leading-relaxed max-w-md"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {feature.description}
                </p>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#09090b] text-white font-semibold text-sm hover:bg-[#09090b]/80 transition-all duration-200 active:scale-[0.97]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Image */}
              <div className="w-full h-[300px] md:h-[480px] rounded-2xl overflow-hidden relative group">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-2 mt-10">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
              className="relative h-1 flex-1 rounded-full bg-[#09090b]/[0.06] overflow-hidden transition-all duration-200"
              aria-label={`Go to feature ${index + 1}`}
            >
              <motion.div
                className="h-full bg-[#09090b] rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: index === currentIndex ? "100%" : index < currentIndex ? "100%" : "0%",
                }}
                transition={{
                  duration: index === currentIndex && isAutoPlaying ? 4 : 0.3,
                  ease: index === currentIndex && isAutoPlaying ? "linear" : EASE_OUT_STRONG,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Sketch Lottie Hook ───────────────────────────────────────────────────────

function useSketchLottie() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('/Sketches _ Call to action.json')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => { });
  }, []);
  return data;
}

function useSearchLottie() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('/Data _ Searching.json')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => { });
  }, []);
  return data;
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Lavanya",
    role: "Found her soulmate",
    content: "OMG!! We were in the same class and I have a lowkey crush, but introvert me can't express. By chance I posted the confession on MetLL and boom we are together now.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Harsh Agarwal",
    role: "Matched with his crush",
    content: "Met on a group trip to Himalayas. She was my trekmate and I liked her in first glance. Wrote a confession for her, next day she also wrote one for me and the rest is history.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jitender Kumar",
    role: "In a relationship",
    content: "Tired of swiping left and right on other dating apps, remembered my crush of college and he already has a confession for me. Now we are together forever...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Vani Sharma",
    role: "Engaged!",
    content: "He used to come daily morning for jogging in the nearby park. Finally gathered the courage to express on MetLL, and the confession was already waiting for me...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Amrit",
    role: "Happily married",
    content: "MetLL changed my life. I found my soulmate here. Thank you for creating such a wonderful platform.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sujal Jain",
    role: "Dating for 1 year",
    content: "The anonymous confession feature took away all the pressure. Best decision I ever made was using MetLL!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialsSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalDuration = 5000;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (forwardedRef && typeof forwardedRef === "object" && sectionRef.current) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
    }
  }, [forwardedRef]);

  useEffect(() => {
    const progressStep = 100 / (intervalDuration / 50);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-bg="bg-[#09090b]"
      data-nav-text="text-white"
      className="relative bg-[#09090b] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle decorative orb */}
      <div
        className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE_OUT_STRONG }}
          className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-16 md:mb-20"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          What Our Early Access Users Say
        </motion.p>

        {/* Testimonial Content */}
        <div className="min-h-[280px] md:min-h-[240px] relative cursor-pointer" onClick={() => { setActiveIndex((prev) => (prev + 1) % testimonials.length); setProgress(0); }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT_STRONG }}
              className="absolute inset-0"
            >
              {/* Quote */}
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white/10 mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <p
                className="text-white/90 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-8"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {testimonials[activeIndex].content}
              </p>

              <div className="flex items-center gap-3">

                <div>
                  <p className="text-white/70 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-white/30 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(index); setProgress(0); }}
              className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden transition-colors duration-200 hover:bg-white/[0.1]"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <motion.div
                className="h-full bg-white/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: index === activeIndex ? `${progress}%` : index < activeIndex ? "100%" : "0%",
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── App Download CTA Section ─────────────────────────────────────────────────

const AppDownloadSection = forwardRef<HTMLElement>((_, ref) => {
  const [lottieData, setLottieData] = useState<any>(null);

  useEffect(() => {
    fetch('/Sketches _ Call to action.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => { });
  }, []);

  return (
    <section ref={ref} data-nav-bg="bg-[#fafafa]" data-nav-text="text-[#09090b]" className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-violet-500/10 to-amber-500/10" />
      <div className="absolute inset-0 bg-[#fafafa]" style={{ opacity: 0.92 }} />
      {/* Noise */}
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-50" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
          >
            <p
              className="text-rose-500/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Download Now
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#09090b] leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              Start Your
              <br />
              Love Story Today
            </h2>
            <p
              className="text-[#09090b]/50 text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Available now on Google Play. Download MetLL and confess your feelings — anonymously, safely, and with zero awkwardness.
            </p>

            <StoreButtons variant="light" />


          </motion.div>

          {/* Lottie / Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_STRONG }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-square">
              {lottieData ? (
                <Lottie animationData={lottieData} loop={true} className="w-full h-full" />
              ) : (
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center">
                  <Smartphone className="w-16 h-16 text-[#09090b]/10" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// ─── FAQ Section ──────────────────────────────────────────────────────────────

const faqData = [
  {
    question: "How to confess anonymously and date?",
    answer: "MetLL allows you to confess your feelings anonymously to your crush. Simply provide details about your crush (school, college, office, or location-based). When both parties confess about each other, our AI-powered matching system detects the mutual feelings and reveals the match instantly, allowing you to connect and date.",
  },
  {
    question: "What is MetLL anonymous confession app?",
    answer: "MetLL is an anonymous confession and matchmaking app where you can confess your secret crush from school, college, office, or any location. Our revolutionary platform uses AI-powered matching to detect mutual feelings. When both parties confess about each other, we reveal the match, enabling genuine connections and dating.",
  },
  {
    question: "How to confess anonymously to your crush?",
    answer: "On MetLL, you can confess anonymously by providing details about your crush such as their school, college, office, or location. You can also include personality traits, shared moments, or any identifying details. The confession is stored securely. If your crush also confesses about you, we instantly reveal the mutual match.",
  },
  {
    question: "Is there an app to confess anonymously and get matched?",
    answer: "Yes, MetLL is the anonymous confession app that matches you when mutual feelings are detected. Confess your secret crush from school, college, office, or anywhere. Our AI algorithm analyzes confessions in real-time. When both parties confess, we reveal the match instantly.",
  },
  {
    question: "How does anonymous confession and dating work?",
    answer: "MetLL works by allowing you to anonymously confess about your crush. Our intelligent AI algorithm analyzes all confessions in real-time. When someone confesses about you too, we detect the mutual match and reveal it to both parties instantly.",
  },
  {
    question: "Is my confession really anonymous?",
    answer: "Yes, your confession is completely anonymous until a mutual match is detected. We store your confession securely and only reveal it when your crush also confesses about you. Until then, your identity remains completely private.",
  },
  {
    question: "What happens if my crush doesn't confess back?",
    answer: "If your crush doesn't confess back, your confession remains stored securely and anonymously. There's no pressure or awkwardness — they'll never know unless they also confess about you.",
  },
  {
    question: "Can I use MetLL for school, college, or office crushes?",
    answer: "Absolutely! MetLL is designed for all types of crushes — school, college, office, and even location-based crushes. Simply provide the relevant details when making your confession.",
  },
  {
    question: "How do I download MetLL?",
    answer: "MetLL is available on Google Play. You can download it directly from the Play Store. iOS version is coming soon — stay tuned!",
  },
  {
    question: "What is the best anonymous confession app for dating?",
    answer: "MetLL is the revolutionary anonymous confession app for dating. It allows you to confess your secret crush from school, college, office, or any location. Our AI-powered matching system detects mutual feelings instantly. When both parties confess, we reveal the match.",
  },
];

const scrollToAuth = () => {
  const authSection = document.getElementById("auth");
  if (authSection) authSection.scrollIntoView({ behavior: "smooth" });
};

const FAQSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (forwardedRef && typeof forwardedRef === "object" && sectionRef.current) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
    }
  }, [forwardedRef]);

  return (
    <section
      ref={sectionRef}
      data-nav-bg="bg-[#09090b]"
      data-nav-text="text-white"
      className="relative bg-[#09090b] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-white/20" />
            <p
              className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Frequently Asked Questions
            </p>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            Got Questions?
          </h2>
        </motion.div>

        {/* FAQ Grid */}
        <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: EASE_OUT_STRONG }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-white/[0.06] rounded-xl px-5 py-1 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span
                    className="text-sm md:text-base font-medium text-white/80 pr-4"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="text-white/40 text-sm leading-relaxed pb-5 pt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: EASE_OUT_STRONG }}
          className="mt-14 md:mt-20 text-center"
        >
          <p className="text-white/20 text-sm mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Still have questions?
          </p>
          <Button
            variant="outline"
            onClick={scrollToAuth}
            className="rounded-full px-8 py-5 border-white/[0.08] bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.12] transition-all duration-200 active:scale-[0.97] text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

// ─── Auth Section ─────────────────────────────────────────────────────────────

const AuthSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="auth" data-nav-bg="bg-white" data-nav-text="text-[#09090b]" className="relative z-30">
      <AnimatedCharactersLoginPage />
    </section>
  );
});

// ─── Footer Section ───────────────────────────────────────────────────────────

const FooterSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} data-nav-bg="bg-[#09090b]" data-nav-text="text-white" className="relative bg-[#09090b] overflow-hidden border-t border-white/[0.04]">
      {/* Large MetLL Background Text */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none select-none">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_OUT_STRONG }}
          className="font-bold text-white/[0.02] leading-[0.75] text-center whitespace-nowrap"
          style={{
            fontFamily: "'Novaklasse', sans-serif",
            fontSize: "clamp(180px, 30vw, 400px)",
            marginBottom: "-0.05em",
          }}
        >
          MetLL
        </motion.h1>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
            {/* Brand */}
            <div className="md:max-w-[300px]">
              <h3
                className="text-2xl font-semibold text-white mb-3"
                style={{ fontFamily: "'Novaklasse', sans-serif" }}
              >
                MetLL
              </h3>
              <p
                className="text-white/30 text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Confess anonymously, connect genuinely.
                <br />
                Where secret crushes become love stories.
              </p>

              <StoreButtons variant="dark" className="flex-col sm:flex-row" />
            </div>

            {/* Links */}
            <div className="flex gap-16 md:gap-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div>
                <h4 className="text-white/50 font-semibold text-xs uppercase tracking-wider mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">About</Link></li>
                  <li><Link to="/privacy" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">Privacy</Link></li>
                  <li><Link to="/contact" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">Contact</Link></li>
                  <li><Link to="/safety-standards" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">Safety</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white/50 font-semibold text-xs uppercase tracking-wider mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">
                      Google Play
                    </a>
                  </li>
                  <li><span className="text-white/15 text-sm">App Store (Soon)</span></li>
                  <li><Link to="/blog" className="text-white/30 hover:text-white/60 transition-colors duration-200 text-sm">Blog</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="bg-white/[0.04] mb-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/15 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              © {new Date().getFullYear()} MetLL. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-white/15 hover:text-white/30 transition-colors duration-200 text-xs">Privacy Policy</Link>
              <Link to="/deletion" className="text-white/15 hover:text-white/30 transition-colors duration-200 text-xs">Data Deletion</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
