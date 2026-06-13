import { Link } from "react-router-dom";
import { useEffect, useRef, useState, forwardRef } from "react";
import AnimatedCharactersLoginPage from "@/components/ui/animated-characters-login-page";
import { ConicGradientButton } from "@/components/ui/conic-gradient-button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, HelpCircle, Heart, X, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.1 : 1,
          y: isExiting ? -20 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-black to-black/70"
          style={{ 
            fontFamily: "'Novaklasse', sans-serif",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1)) drop-shadow(0 1px 1px rgba(255,255,255,0.9))"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MetLL
        </motion.h1>

        {/* Animated loading dots */}
        <motion.div
          className="flex gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-black/80"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// SIMULATION WIDGET COMPONENT
function SimulationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Peek Tab & Card Container */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : ["100%", "88%", "100%", "100%"] }}
        transition={
          isOpen
            ? { type: "spring", stiffness: 300, damping: 30 }
            : { duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 1] }
        }
        className="fixed top-1/2 -translate-y-1/2 right-0 z-40"
      >
        {/* The Peek Tab (visible when closed) */}
        <div
          onClick={() => setIsOpen(true)}
          className={`absolute -left-12 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 border-r-0 rounded-l-xl p-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100 hover:bg-white/20"}`}
        >
          <div className="writing-vertical-rl flex items-center justify-center gap-2 text-white font-bold tracking-widest text-sm py-4">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>TEST MAGIC</span>
          </div>
        </div>

        {/* The Glassmorphism Card (adapted from user's snippet to match vibe) */}
        <div className="w-[340px] bg-white/10 backdrop-blur-xl border-l border-y border-white/30 rounded-l-3xl p-6 shadow-[-10px_10px_30px_rgba(0,0,0,0.2)] flex flex-col relative mr-[-2px]">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Badges adapted to glass */}
          <div className="absolute -top-4 -left-6 z-20 bg-gradient-to-r from-orange-400 to-rose-500 text-white px-4 py-1.5 rounded-lg font-bold text-xs shadow-lg rotate-[-6deg]">
            AI Powered
          </div>

          <div className="bg-white/20 rounded-2xl p-4 border border-white/20 text-center mb-4 mt-2">
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop"
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-1 shadow-sm">
                  <Heart className="w-3 h-3 fill-white text-white" />
                </span>
              </div>
              <div className="text-left">
                <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-300 mb-0.5">Top Confessor</p>
                <h4 className="text-sm font-black text-white">Amit Kumar</h4>
                <span className="inline-block bg-white/30 text-white text-[8px] font-mono px-1.5 py-0.5 rounded-full backdrop-blur-sm mt-1">
                  VERIFIED MATCHED
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/20 text-left">
              <p className="text-[11px] font-medium italic text-white/90 leading-relaxed">
                "I used MetLL to tell my campus crush Tanya. We matched in minutes without any awkwardness!"
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/20 rounded-2xl p-4 w-full text-center shadow-inner relative overflow-hidden group">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 mx-auto animate-bounce mb-2" />
            <span className="block text-sm font-black text-white leading-tight">
              Want to test the magic?
            </span>
            <p className="text-[11px] text-white/70 leading-snug mt-1.5 mb-4">
              Try writing a secret. Click below to summon an immediate mutual match.
            </p>

            <button
              onClick={() => {
                setIsOpen(false);
                setModalOpen(true);
              }}
              className="w-full bg-white hover:bg-gray-100 text-[#311717] text-xs font-bold py-3 px-4 rounded-full transition-all shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              Simulate Mutual Match! 💖
            </button>
          </div>
        </div>
      </motion.div>

      {/* Simulation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1A0B1B] to-[#311717] rounded-3xl p-8 shadow-2xl border border-white/10 text-center overflow-hidden"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-500/20 to-transparent pointer-events-none" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(225,29,72,0.5)]"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black text-white mb-2"
                style={{ fontFamily: "'Novaklasse', sans-serif" }}
              >
                It's a Match!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 mb-8"
              >
                You and Tanya from BMS dept both confessed to each other.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-6"
              >
                <p className="text-xs text-rose-300 font-bold mb-1 uppercase tracking-wider">The Memory</p>
                <p className="text-sm text-white/90 italic">
                  "We were looking for the same macroeconomics textbook on Wednesday. You giggled because both our hands grabbed the book simultaneously. I was wearing red headphones."
                </p>
                <p className="text-xs text-white/40 mt-3 flex items-center gap-1">
                  📍 St. Patrick's College - Library Corridor
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setModalOpen(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.6)] transition-all hover:-translate-y-0.5"
              >
                Start Chatting Now
              </motion.button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Index() {
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const loginRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navbarHeight = 60;

      setIsAtTop(scrollY < 50);

      // If at the very top of the page, always use light navbar
      if (scrollY < 50) {
        setIsDarkNavbar(false);
        return;
      }

      // If refs aren't ready yet, default to light navbar (for hero section)
      if (!featuresRef.current) {
        setIsDarkNavbar(false);
        return;
      }

      const getAbsoluteTop = (element: HTMLElement | null) => {
        if (!element) return Infinity;
        return element.getBoundingClientRect().top + window.scrollY;
      };

      const featuresTop = getAbsoluteTop(featuresRef.current);
      const featuresBottom =
        featuresTop + (featuresRef.current?.offsetHeight ?? 0);
      const testimonialsTop = getAbsoluteTop(testimonialsRef.current);
      const testimonialsBottom =
        testimonialsTop + (testimonialsRef.current?.offsetHeight ?? 0);
      const faqTop = getAbsoluteTop(faqRef.current);
      const faqBottom = faqTop + (faqRef.current?.offsetHeight ?? 0);
      const loginTop = getAbsoluteTop(loginRef.current);
      const footerTop = getAbsoluteTop(footerRef.current);

      const currentPosition = scrollY + navbarHeight;

      // Dark navbar (black bg) when over:
      // - Features section (white bg)
      // - FAQ section (white bg)
      // - Login section (white right side)
      // Light navbar (white bg) when over:
      // - Hero section (blue bg)
      // - Testimonials section (blue bg)
      // - Footer section (blue bg)

      const isOverFeatures =
        currentPosition >= featuresTop && currentPosition < featuresBottom;
      const isOverTestimonials =
        currentPosition >= testimonialsTop && currentPosition < testimonialsBottom;
      const isOverFaq =
        currentPosition >= faqTop && currentPosition < faqBottom;
      const isOverLogin =
        currentPosition >= loginTop && currentPosition < footerTop;

      // Keep navbar transparent while over Hero or Features sections
      setIsAtTop(scrollY < 50 || currentPosition < featuresBottom);

      setIsDarkNavbar(isOverLogin);
    };

    window.addEventListener("scroll", handleScroll);

    // Set initial state immediately - always light at top
    setIsDarkNavbar(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SEOHead
        title="MetLL - Confess Anonymously & Date | Anonymous Confession App"
        description="Confess your secret crush anonymously from school, college, office, or anywhere. When mutual feelings are detected, we reveal the match so you can connect and date."
        keywords="anonymous confession, dating app, secret crush, matchmaking, love, mutual feelings, crush finder"
      />

      <SimulationWidget />

      <div className="w-full bg-white relative pt-0">
        <Header
          isDark={isDarkNavbar}
          isAtTop={isAtTop}
          onHomeClick={() => {
            heroRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          onContactClick={() => {
            footerRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        {/* Sticky Parallax Wrapper for Hero and Features */}
        <div className="relative z-0">
          <div className="sticky top-0 overflow-hidden -z-10">
            <HeroSection ref={heroRef} />
          </div>
          <div className="relative z-10 bg-transparent">
            <FeaturesSection ref={featuresRef} />
          </div>
        </div>
        <TestimonialsSection ref={testimonialsRef} />
        <FAQSection ref={faqRef} />
        <AuthSection ref={loginRef} />
        <FooterSection ref={footerRef} />
      </div>
    </>
  );
}

// FAQ Data
const faqData = [
  {
    question: "How to confess anonymously and date?",
    answer:
      "MetLL allows you to confess your feelings anonymously to your crush. Simply provide details about your crush (school, college, office, or location-based). When both parties confess about each other, our AI-powered matching system detects the mutual feelings and reveals the match instantly, allowing you to connect and date.",
  },
  {
    question: "What is MetLL anonymous confession app?",
    answer:
      "MetLL is an anonymous confession and matchmaking app where you can confess your secret crush from school, college, office, or any location. Our revolutionary platform uses AI-powered matching to detect mutual feelings. When both parties confess about each other, we reveal the match, enabling genuine connections and dating.",
  },
  {
    question: "How to confess anonymously to your crush?",
    answer:
      "On MetLL, you can confess anonymously by providing details about your crush such as their school, college, office, or location. You can also include personality traits, shared moments, or any identifying details. The confession is stored securely. If your crush also confesses about you, we instantly reveal the mutual match, allowing you to connect and date.",
  },
  {
    question: "Is there an app to confess anonymously and get matched?",
    answer:
      "Yes, MetLL is the anonymous confession app that matches you when mutual feelings are detected. Confess your secret crush from school, college, office, or anywhere. Our AI algorithm analyzes confessions in real-time. When both parties confess, we reveal the match instantly. Join the waitlist for free early access to the best anonymous confession app for dating.",
  },
  {
    question: "How does anonymous confession and dating work?",
    answer:
      "MetLL works by allowing you to anonymously confess about your crush. Our intelligent AI algorithm analyzes all confessions in real-time. When someone confesses about you too, we detect the mutual match and reveal it to both parties instantly. This enables you to connect and date without the awkwardness of direct approaches.",
  },
  {
    question: "Can I confess my crush anonymously and find out if they like me?",
    answer:
      "Yes! MetLL lets you confess anonymously about your crush. If your crush also confesses about you, our AI matching system detects the mutual feelings and reveals the match instantly. This way, you can find out if they like you back without the risk of rejection, allowing you to connect and date when feelings are mutual.",
  },
  {
    question: "What is the best anonymous confession app for dating?",
    answer:
      "MetLL is the revolutionary anonymous confession app for dating. It allows you to confess your secret crush from school, college, office, or any location. Our AI-powered matching system detects mutual feelings instantly. When both parties confess, we reveal the match, enabling genuine connections and dating. Join the waitlist for free early access to experience the best anonymous confession platform.",
  },
  {
    question: "Is my confession really anonymous?",
    answer:
      "Yes, your confession is completely anonymous until a mutual match is detected. We store your confession securely and only reveal it when your crush also confesses about you. Until then, your identity remains completely private. This allows you to express your feelings without fear of rejection or awkwardness.",
  },
  {
    question: "What happens if my crush doesn't confess back?",
    answer:
      "If your crush doesn't confess back, your confession remains stored securely and anonymously. There's no pressure or awkwardness - they'll never know unless they also confess about you. You can always update your confession or confess about someone else. The beauty of MetLL is that it only reveals matches when feelings are mutual.",
  },
  {
    question: "Can I use MetLL for school, college, or office crushes?",
    answer:
      "Absolutely! MetLL is designed for all types of crushes - school crushes, college crushes, office crushes, and even location-based crushes. Simply provide the relevant details (school name, college name, office name, or location) when making your confession. Our AI matching system works across all these categories to find mutual matches.",
  },
];

// FAQ Section Component
const FAQSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Combine refs
  useEffect(() => {
    if (
      forwardedRef &&
      typeof forwardedRef === "object" &&
      sectionRef.current
    ) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
        sectionRef.current;
    }
  }, [forwardedRef]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#303030] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5A6FA3]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-sm md:text-base font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              Frequently Asked Questions
            </motion.p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            Got Questions? We've Got Answers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Everything you need to know about confessing anonymously and finding your match
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 rounded-xl px-6 py-2 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span
                      className="text-lg md:text-xl font-bold tracking-wide text-white pr-4"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base md:text-lg leading-relaxed pb-6 pt-2">
                    <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p
            className="text-lg md:text-xl text-white/70 mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Still have questions?
          </p>
          <button
            onClick={scrollToAuth}
            className="px-8 md:px-12 py-4 md:py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg md:text-base tracking-wide shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Join the Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
});

const AuthSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="auth" className="relative z-30">
      <AnimatedCharactersLoginPage />
    </section>
  );
});

const scrollToAuth = () => {
  const authSection = document.getElementById("auth");
  if (authSection) {
    authSection.scrollIntoView({ behavior: "smooth" });
  }
};

// Footer Section Component
const FooterSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative bg-[#5A6FA3] overflow-hidden min-h-[500px] md:min-h-[700px] lg:min-h-[800px]"
    >
      {/* Large MetLL Text as Background - positioned absolutely to fill the section */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
        <motion.h1
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-bold text-black leading-[0.75] text-center whitespace-nowrap select-none"
          style={{
            fontFamily: "'Novaklasse', sans-serif",
            fontSize: "clamp(200px, 35vw, 450px)",
            marginBottom: "-0.05em",
          }}
        >
          MetLL
        </motion.h1>
      </div>

      {/* Progressive blur overlay - blurry at top, gradually clears at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 80%)",
        }}
      />

      {/* Content Layer - positioned above the background text */}
      <div className="relative z-10">
        {/* Footer Content */}
        <div className="pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
            {/* Brand Column - Left */}
            <div className="md:max-w-[300px]">
              <h3
                className="text-2xl md:text-3xl font-semibold text-white mb-4"
                style={{ fontFamily: "'Novaklasse', sans-serif" }}
              >
                MetLL
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Confess anonymously, connect genuinely.
                <br />
                Where secret crushes become love stories.
              </p>
              <p className="text-white/50 text-xs">
                © 2025 MetLL. All rights reserved.
              </p>
            </div>

            {/* Links - Right */}
            <div className="flex gap-10 sm:gap-16 md:gap-20">
              {/* Company Links */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/about"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Social
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Twitter (X)
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

function Header({
  isDark,
  isAtTop,
  onHomeClick,
  onContactClick,
}: {
  isDark: boolean;
  isAtTop?: boolean;
  onHomeClick: () => void;
  onContactClick: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full px-4 md:px-8 lg:px-12 py-2 z-50 transition-all duration-700 ease-in-out ${isAtTop
        ? "bg-white/95 md:bg-transparent shadow-sm md:shadow-none backdrop-blur-md md:backdrop-blur-none"
        : `backdrop-blur-md shadow-sm ${isDark ? "bg-black/95" : "bg-white/95"}`
        }`}
    >
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold transition-colors duration-700 ${isAtTop
            ? "text-[#311717] md:text-white"
            : (isDark ? "text-white" : "text-[#311717]")
            }`}
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
        >
          MetLL
        </Link>

        <nav
          className={`hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg font-normal transition-colors duration-700 ${isAtTop || isDark ? "text-white drop-shadow-md" : "text-[#311717]"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
            className="hover:opacity-70 transition-opacity"
          >
            Home
          </a>
          <Link
            to="/about"
            className="hover:opacity-70 transition-opacity"
          >
            About
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onContactClick();
            }}
            className="hover:opacity-70 transition-opacity"
          >
            Contact Us
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToAuth}
            className={`hidden sm:block px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 overflow-hidden relative group ${isAtTop
              ? "border border-white/30 bg-white/10 backdrop-blur-md text-white shadow-md hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
              : isDark
                ? "border-2 border-white bg-white text-black hover:bg-gray-200 shadow-md"
                : "border-2 border-[#5A6FA3] bg-[#5A6FA3] text-white hover:bg-[#4A5E96] shadow-md"
              }`}
          >
            <span className="block transition-opacity duration-300 group-hover:opacity-0">
              GET STARTED
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Login / Sign up
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-700 ${isAtTop
              ? "text-[#311717]"
              : (isDark ? "text-white" : "text-[#311717]")
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 py-4 px-4 shadow-lg transition-all ${isDark ? "bg-black/95" : "bg-white/95"}`}
        >
          <nav
            className={`flex flex-col gap-4 ${isDark ? "text-white" : "text-[#311717]"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <a
              href="#"
              className="py-2 hover:opacity-70 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                onHomeClick();
                setMobileMenuOpen(false);
              }}
            >
              Home
            </a>
            <Link
              to="/about"
              className="py-2 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <a
              href="#"
              className="py-2 hover:opacity-70 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
                setMobileMenuOpen(false);
              }}
            >
              Contact Us
            </a>
            <button
              onClick={() => {
                scrollToAuth();
                setMobileMenuOpen(false);
              }}
              className={`sm:hidden mt-2 px-4 py-3 rounded-full border-2 text-xs font-medium transition-all text-center ${isDark ? "border-white bg-white text-black" : "border-[#5A6FA3] bg-[#5A6FA3] text-white"}`}
            >
              <span className="block">GET STARTED</span>
              <span className="text-[10px] font-normal">
                Login / Sign up
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const [showMembershipText, setShowMembershipText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMembershipText(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-0 md:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-[48px] md:pt-0 bg-[#A4B8E7]"
    >
      {/* DESKTOP ONLY: Light Immersive Background Image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img
          src="/sst.jpg"
          alt="Couple connecting"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile-only images - Component 8 and Component 9 stacked */}
      <div className="md:hidden relative z-10 flex flex-col overflow-hidden w-full">
        <img
          src="/Rectangle 21.png"
          alt=""
          className="w-full h-auto block object-cover"
          style={{ minWidth: "100%" }}
        />
        <img
          src="/Component 9.svg"
          alt=""
          className="w-full h-auto block object-cover -mt-1"
          style={{ minWidth: "100%" }}
        />

        {/* Mobile text overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight text-white text-center drop-shadow-lg"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            Confess. Connect. Date.
          </h1>

          <p
            className="text-sm sm:text-base font-normal text-white text-center mt-3 max-w-[300px] drop-shadow-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Confess Anonymously, we match when its mutual.
          </p>

          <button
            onClick={scrollToAuth}
            className="mt-8 px-6 md:px-10 py-4 bg-white text-[#311717] rounded-full font-bold text-sm md:text-base tracking-wide border-2 border-white/50 backdrop-blur-sm transition-all duration-300 active:scale-95 text-center relative overflow-hidden"
            style={{
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
              fontFamily: "'Novaklasse', sans-serif",
            }}
          >
            <span
              className={`block transition-opacity duration-500 ${showMembershipText ? "opacity-0" : "opacity-100"}`}
            >
              GET STARTED
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 font-dm-sans-mobile text-lg md:text-base font-bold ${showMembershipText ? "opacity-100" : "opacity-0"}`}
            >
              Login / Sign up
            </span>
          </button>
        </div>
      </div>

      {/* DESKTOP ONLY: Main Content Area */}
      <div className="hidden md:flex relative z-20 flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            Confess. Connect. Date.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p
            className="text-base sm:text-lg md:text-xl font-medium text-white/95 mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Confess Anonymously, we match when it's mutual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 md:mt-12 w-full flex justify-center"
        >
          <button
            onClick={scrollToAuth}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-sm md:text-base tracking-widest shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/20 hover:border-white/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            GET STARTED
          </button>
        </motion.div>
      </div>
    </section>
  );
});

const features = [
  {
    step: "01",
    title: "Confess Anonymously",
    description:
      "Pour out the real feelings for your crush, can be either in school, college, office, or any other place. If your dream crush confesses for you, we reveal the shared feelings.",
    image:
      "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    step: "02",
    title: "Memory Match",
    description:
      "Our intelligent AI algorithm works behind the scenes. When someone confesses about you too, that's when the magic happens.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
    isSpecialLayout: true,
  },
  {
    step: "03",
    title: "Crushes at a locality",
    description:
      "When you're at the same location, anonymously confess to your crush. If they confess back while nearby. MetLL will match.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    step: "04",
    title: "Our Hero Feature",
    description:
      "Spot someone at a café, on the train, or anywhere in public. Instantly confess your feelings on Metll right there — no awkward approaches needed.",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    isSpecialLayout: true,
  },
];

const FeaturesSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % features.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  const feature = features[currentIndex];

  return (
    <section ref={forwardedRef as any} className="relative min-h-screen py-24 flex items-center justify-center bg-transparent">
      {/* Background removed to allow Hero section to show through during parallax scroll */}

      <div className="w-full max-w-[1400px] px-4 md:px-8 xl:px-16 mx-auto">
        {/* The Glassmorphism Card */}
        <div className="w-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 relative z-20">
            <div>
              <p className="text-[#5A6FA3] text-sm font-bold tracking-[0.2em] uppercase mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#311717]" style={{ fontFamily: "'Novaklasse', sans-serif" }}>Simple Steps to Love</h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button onClick={prevSlide} className="p-4 rounded-full bg-white hover:bg-gray-50 border border-black/5 text-[#311717] transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={toggleAutoPlay} className="p-4 rounded-full bg-white hover:bg-gray-50 border border-black/5 text-[#311717] transition-all shadow-sm min-w-[54px] flex items-center justify-center">
                {isAutoPlaying ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6" /></svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <button onClick={nextSlide} className="p-4 rounded-full bg-white hover:bg-gray-50 border border-black/5 text-[#311717] transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full h-full"
              >
                {/* Text Side */}
                <div className="space-y-6 md:space-y-8 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-5">
                    <span className="text-7xl md:text-8xl lg:text-9xl font-black text-[#A4B8E7]/50" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                      {feature.step}
                    </span>
                    <div className="h-[3px] flex-1 max-w-[120px] bg-gradient-to-r from-[#A4B8E7] to-transparent rounded-full" />
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#311717] leading-[1.15]" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                    {feature.title}
                  </h3>

                  <p className="text-lg md:text-xl text-[#311717]/70 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={scrollToAuth}
                      className="group inline-flex flex-wrap items-center gap-3 px-8 py-4 rounded-full bg-[#311717] text-white font-bold text-sm md:text-base hover:bg-black hover:gap-4 shadow-xl shadow-black/10 transition-all duration-300"
                    >
                      <span>Get Started</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>

                {/* Media Side */}
                <div className="w-full h-[250px] md:h-[450px] bg-black/5 rounded-[2rem] overflow-hidden relative border border-white/50 shadow-inner group">
                  <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
});

// Testimonials data
const testimonials = [
  {
    name: "Lavanya",
    role: "Found her soulmate",
    content: "OMG!! We were in the same class and I have a lowkey crush, but but but introvert me, I can't express him. By chance I posted the confession on Metll and boom we are together now.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Harsh agarwal",
    role: "Matched with his crush",
    content: "Met on a group trip to Himalayas. She was my trekmate and I liked her in first glance, and wrote a confession for her, next day she also wrote one for me and the rest is history",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Jitender Kumar",
    role: "In a relationship",
    content: "Tired of swiping left and right on other dating apps, remembered my crush of college and he already has a confession for me. Now we are together forever...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Vani sharma.",
    role: "Engaged!",
    content: "he used to come daily morning for jogging in near by park, finally gathered the courage to express on METLL, and the confession was already waiting for me...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Amrit",
    role: "Happily married",
    content: "MetLL changed my life. I found my soulmate here. Thank you for creating such a wonderful platform.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Sujal jain",
    role: "Dating for 1 year",
    content: "The anonymous confession feature took away all the pressure. Best decision I ever made was using MetLL!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

const TestimonialsSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalDuration = 5000; // 5 seconds per testimonial
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Combine refs
  useEffect(() => {
    if (
      forwardedRef &&
      typeof forwardedRef === "object" &&
      sectionRef.current
    ) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
        sectionRef.current;
    }
  }, [forwardedRef]);

  useEffect(() => {
    // Progress bar animation
    const progressStep = 100 / (intervalDuration / 50); // Update every 50ms

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next testimonial
          setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleProgressClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveIndex(index);
    setProgress(0);
  };

  const handleTestimonialClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-16 lg:py-20 bg-white relative overflow-hidden cursor-default md:min-h-screen md:flex md:items-center"
      onClick={handleTestimonialClick}
    >
      {/* Subtle background gradient removed */}

      {/* Decorative Ellipses */}
      <img
        src="/Ellipse 30.svg"
        alt=""
        className="absolute top-[-10%] right-[-15%] w-[300px] md:w-[500px] lg:w-[700px] h-auto opacity-60 pointer-events-none"
      />
      <img
        src="/Ellipse 31.svg"
        alt=""
        className="absolute bottom-[-15%] left-[-10%] w-[350px] md:w-[550px] lg:w-[750px] h-auto opacity-60 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto md:mr-auto md:ml-12 lg:ml-16 px-6 md:px-12 lg:px-16 relative z-10 w-full">
        {/* Glass Card Wrapper */}
        <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Section header */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#311717] text-sm md:text-base font-medium tracking-[0.15em] uppercase mb-12 md:mb-16 text-left"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            What Our Early Access Users Say
          </motion.p>

          {/* Testimonial content */}
          <div className="min-h-[300px] md:min-h-[220px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-[#311717]/80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                {/* Testimonial text */}
                <p
                  className="text-[#311717] text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-4 text-left"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {testimonials[activeIndex].content}
                </p>

                {/* Author name */}
                <p
                  className="text-[#311717]/80 text-base md:text-lg font-medium italic text-left"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ~ {testimonials[activeIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bars */}
          <div className="flex gap-3 md:gap-4 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleProgressClick(e, index)}
                className="flex-1 h-1 bg-[#311717]/20 rounded-full overflow-hidden cursor-pointer hover:bg-[#311717]/30 transition-colors"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className="h-full bg-[#311717] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      index === activeIndex
                        ? `${progress}%`
                        : index < activeIndex
                          ? "100%"
                          : "0%",
                  }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
