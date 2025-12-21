import { Link } from "react-router-dom";
import { useEffect, useRef, useState, forwardRef } from "react";
import AnimatedCharactersLoginPage from "@/components/ui/animated-characters-login-page";
import { ConicGradientButton } from "@/components/ui/conic-gradient-button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after 2 seconds
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 2000);

        // Complete after exit animation
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#A4B8E7]"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isExiting ? 0 : 1,
                    scale: isExiting ? 1.1 : 1,
                    y: isExiting ? -20 : 0
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-semibold text-[#311717]"
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
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
                            className="w-3 h-3 rounded-full bg-[#311717]"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Index() {
    const [isDarkNavbar, setIsDarkNavbar] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const heroRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<HTMLElement>(null);
    const testimonialsRef = useRef<HTMLElement>(null);
    const loginRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const navbarHeight = 60;

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

            const featuresTop = featuresRef.current?.offsetTop ?? Infinity;
            const featuresBottom = featuresTop + (featuresRef.current?.offsetHeight ?? 0);
            const loginTop = loginRef.current?.offsetTop ?? Infinity;
            const footerTop = footerRef.current?.offsetTop ?? Infinity;

            const currentPosition = scrollY + navbarHeight;

            // Dark navbar (black bg) when over:
            // - Features section (white bg)
            // - Login section (white right side)
            // Light navbar (white bg) when over:
            // - Hero section (blue bg)
            // - Testimonials section (blue bg)
            // - Footer section (blue bg)

            const isOverFeatures = currentPosition >= featuresTop && currentPosition < featuresBottom;
            const isOverLogin = currentPosition >= loginTop && currentPosition < footerTop;

            setIsDarkNavbar(isOverFeatures || isOverLogin);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Set initial state immediately - always light at top
        setIsDarkNavbar(false);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Preloader */}
            <AnimatePresence>
                {isLoading && (
                    <Preloader onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <div className="w-full bg-[#A4B8E7] relative pt-14">
                <Header 
                    isDark={isDarkNavbar} 
                    onHomeClick={() => {
                        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onAboutClick={() => {
                        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onContactClick={() => {
                        footerRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
                <HeroSection ref={heroRef} />
                <FeaturesSection ref={featuresRef} />
                <TestimonialsSection ref={testimonialsRef} />
                <LoginSection ref={loginRef} />
                <FooterSection ref={footerRef} />
            </div>
        </>
    );
}

const LoginSection = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section ref={ref} id="waitlist" className="relative z-30">
            <AnimatedCharactersLoginPage />
        </section>
    );
});

const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// Footer Section Component
const FooterSection = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section ref={ref} className="relative bg-[#5A6FA3] overflow-hidden min-h-[500px] md:min-h-[700px] lg:min-h-[800px]">
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
                        fontSize: 'clamp(200px, 35vw, 450px)',
                        marginBottom: '-0.05em',
                    }}
                >
                    MetLL
                </motion.h1>
            </div>

            {/* Progressive blur overlay - blurry at top, gradually clears at bottom */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
            }} />


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
                                Confess anonymously, connect genuinely.<br />
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
                                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
                                <ul className="space-y-3">
                                    <li><a href="/about" className="text-white/70 hover:text-white transition-colors text-sm">About us</a></li>
                                    <li><a href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy</a></li>
                                    <li><a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a></li>
                                </ul>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Social</h4>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Twitter (X)</a></li>
                                    <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Facebook</a></li>
                                    <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});


function Header({ isDark, onHomeClick, onAboutClick, onContactClick }: { isDark: boolean; onHomeClick: () => void; onAboutClick: () => void; onContactClick: () => void }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full px-4 md:px-8 lg:px-12 py-2 z-50 backdrop-blur-md shadow-sm transition-all duration-700 ease-in-out ${isDark ? 'bg-black/95' : 'bg-white/95'
                }`}
        >
            <div className="max-w-[1500px] mx-auto flex items-center justify-between">
                <Link
                    to="/"
                    className={`text-2xl sm:text-3xl md:text-4xl font-semibold transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#311717]'}`}
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                >
                    MetLL
                </Link>

                <nav
                    className={`hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg font-normal transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#311717]'}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="hover:opacity-70 transition-opacity">
                        Home
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onAboutClick(); }} className="hover:opacity-70 transition-opacity">
                        About
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="hover:opacity-70 transition-opacity">
                        Contact Us
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={scrollToWaitlist}
                        className={`hidden sm:block px-4 md:px-6 py-2 rounded-full border-2 text-xs md:text-sm font-medium transition-all shadow-md ${isDark ? 'border-white bg-white text-black hover:bg-gray-200' : 'border-[#5A6FA3] bg-[#5A6FA3] text-white hover:bg-[#4A5E96]'}`}
                    >
                        JOIN THE WAITLIST
                    </button>

                    {/* Mobile hamburger menu */}
                    <button
                        className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-[#311717] hover:bg-black/5'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
                <div className={`md:hidden absolute top-full left-0 right-0 py-4 px-4 shadow-lg transition-all ${isDark ? 'bg-black/95' : 'bg-white/95'}`}>
                    <nav className={`flex flex-col gap-4 ${isDark ? 'text-white' : 'text-[#311717]'}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <a href="#" className="py-2 hover:opacity-70 transition-opacity" onClick={(e) => { e.preventDefault(); onHomeClick(); setMobileMenuOpen(false); }}>
                            Home
                        </a>
                        <a href="#" className="py-2 hover:opacity-70 transition-opacity" onClick={(e) => { e.preventDefault(); onAboutClick(); setMobileMenuOpen(false); }}>
                            About
                        </a>
                        <a href="#" className="py-2 hover:opacity-70 transition-opacity" onClick={(e) => { e.preventDefault(); onContactClick(); setMobileMenuOpen(false); }}>
                            Contact Us
                        </a>
                        <button
                            onClick={() => { scrollToWaitlist(); setMobileMenuOpen(false); }}
                            className={`sm:hidden mt-2 px-4 py-3 rounded-full border-2 text-sm font-medium transition-all ${isDark ? 'border-white bg-white text-black' : 'border-[#5A6FA3] bg-[#5A6FA3] text-white'}`}
                        >
                            JOIN THE WAITLIST
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

const HeroSection = forwardRef<HTMLElement>((_, ref) => {
    return (
        <section ref={ref} className="relative w-full min-h-0 md:min-h-[63rem] flex flex-col md:flex-row items-start justify-center px-4 md:px-8 lg:px-12 pt-0 md:pt-28 lg:pt-32 pb-0 md:pb-12 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-[-5%] bottom-[10%] w-[500px] h-[500px] md:w-[835px] md:h-[795px] "></div>

                <div className="absolute right-[5%] top-[15%] w-[400px] h-[400px] md:w-[812px] md:h-[695px]   "></div>

                <svg className="absolute left-[5%] md:left-[7%] top-[15%] w-[800px] md:w-[1319px] h-[60px] md:h-[96px] opacity-55 blur-[20px] hidden md:block" viewBox="0 0 1399 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1126.94 89.1665C852.119 115.067 960.588 136 679.196 136C236.082 86.3281 40 162.481 40 120.744C263.873 107.261 112.566 31.6891 549.504 45.1714C1165.54 21.0451 1671.96 89.1665 1126.94 89.1665Z" fill="#CAE1FE" />
                </svg>

                <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/21e7f575e0ad819c60cd1414087041c754c0922f?width=484"
                    alt=""
                    className="absolute left-[5%] md:left-[7%] top-[25%] md:top-[30%] w-[120px] md:w-[242px] h-[120px] md:h-[242px] rotate-[-14deg] hidden md:block"
                />

                <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/7af30a2a8d500ada144f554e62b4d84cd6010267?width=519"
                    alt=""
                    className="absolute left-[15%] md:left-[20%] top-[40%] md:top-[42%] w-[130px] md:w-[260px] h-[130px] md:h-[260px] hidden md:block"
                />

                <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/7af30a2a8d500ada144f554e62b4d84cd6010267?width=519"
                    alt=""
                    className="absolute left-[8%] md:left-[11%] top-[-2%] w-[130px] md:w-[260px] h-[130px] md:h-[260px] hidden md:block"
                />
            </div>

            <div className="absolute left-0 md:left-4 lg:left-8 top-[20%] md:top-[30%] h-[300px] md:h-[428px] w-[40px] md:w-[57px] bg-white hidden md:flex items-center justify-center overflow-hidden">
                <p className="text-[#311717] text-[23px] whitespace-nowrap -rotate-90" style={{ fontFamily: "'Nats', sans-serif" }}>
                    Lorem ipsum dolor sit amet consectetur
                </p>
            </div>

            {/* Ellipse behind Eiffel Tower */}
            <div className="absolute left-[-50%] lg:left-[0%] bottom-[-20%] z-[5] pointer-events-none">
                <img
                    src="/Ellipse 31.svg"
                    alt=""
                    className="w-[400px] md:w-[700px] lg:w-[900px] h-auto"
                />
            </div>

            {/* Eiffel Tower - hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-[-20%] lg:left-[-10%] top-[17%] md:top-[15%] z-10 md:z-20 pointer-events-none" style={{ transform: 'translateY(calc(-25% + 80px))' }}>
                <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/eb89dd7aca05fa3afa46375542789c2eadeb70ea?width=2070"
                    alt="Eiffel Tower illustration"
                    className="w-auto h-[600px] md:h-[1035px] lg:h-[1035px]"
                />
            </div>

            {/* Mobile-only images - Component 8 and Component 9 stacked */}
            <div className="md:hidden relative z-10 flex flex-col overflow-hidden" style={{ width: '100vw', marginLeft: '-50vw', left: '50%', position: 'relative' }}>
                <img
                    src="/Rectangle 21.png"
                    alt=""
                    className="w-full h-auto block object-cover"
                    style={{ minWidth: '100%' }}
                />
                <img
                    src="/Component 9.svg"
                    alt=""
                    className="w-full h-auto block object-cover -mt-1"
                    style={{ minWidth: '100%' }}
                />
                
                {/* Mobile text overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
                    <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-white text-center drop-shadow-lg" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                        Confess. Connect. Date.
                    </h1>

                    <p className="text-sm sm:text-base font-normal text-white text-center mt-3 max-w-[300px] drop-shadow-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Confess Anonymously, we match when its mutual.
                    </p>

                    <button
                        onClick={scrollToWaitlist}
                        className="mt-8 px-10 py-4 bg-white text-[#311717] rounded-full font-bold text-base tracking-wide border-2 border-white/50 backdrop-blur-sm transition-all duration-300 active:scale-95"
                        style={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                            fontFamily: "'Novaklasse', sans-serif"
                        }}
                    >
                        JOIN THE WAITLIST
                    </button>
                </div>
            </div>

            {/* Main content area - desktop only */}
            <div className="hidden md:flex max-w-[1500px] w-full mx-auto relative z-20 flex-col items-center pt-4 md:-mt-8 lg:-mt-16 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-semibold leading-tight text-[#311717] text-center" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                    Confess. Connect. Date.
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white text-center mt-4 md:mt-6 max-w-[600px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Confess Anomously , we match when its mutual.
                </p>

                {/* Desktop ConicGradientButton */}
                <ConicGradientButton
                    lightColor="#ffffff"
                    backgroundColor="rgba(200, 215, 245, 0.5)"
                    borderWidth={2}
                    duration={6}
                    blurAmount={4}
                    className="mt-6 md:mt-8 h-auto text-sm md:text-base"
                    onClick={scrollToWaitlist}
                >
                    <span>JOIN THE WAITLIST</span>
                </ConicGradientButton>
            </div>

            {/* Images container - hidden on mobile, positioned at bottom-right, BEHIND text */}
            <div className="hidden md:block absolute right-[5%] bottom-[5%] z-[1] pointer-events-none">
                <img
                    src="/Component 8.svg"
                    alt=""
                    className="w-[500px] lg:w-[650px] xl:w-[800px] 2xl:w-[900px] h-auto scale-[1.4]"
                />
            </div>
        </section>
    );
});

const features = [
    {
        step: "01",
        title: "Confess Anonymously",
        description: "Pour out the real feelings for your crush, can be either in school, college, office, or any other place. If your dream crush confesses for you, we reveal the shared feelings.",
        image: "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww"
    },
    {
        step: "02",
        title: "Smart Matching",
        description: "Our intelligent AI algorithm works behind the scenes. When someone confesses about you too, that's when the magic happens.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww"
    },
    {
        step: "03",
        title: "Crushes at a loacality",
        description: "When you're at the same location, anonymously confess to your crush. If they confess back while nearby. MetLL will match.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
    },
    {
        step: "04",
        title: "Build Real Bonds",
        description: "Transform anonymous confessions into meaningful relationships. What starts as a secret crush becomes your love story.",
        image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    }
];

const FeaturesSection = forwardRef<HTMLElement>((_, forwardedRef) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isLockedRef = useRef(false);
    const touchStartY = useRef(0);
    const currentIndexRef = useRef(0);
    const touchProcessedRef = useRef(false);
    const lastChangeTime = useRef(0);
    const hasSnappedRef = useRef(false);

    // Keep ref in sync with state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Combine refs for both internal use and forwarding
    useEffect(() => {
        if (forwardedRef && typeof forwardedRef === 'object' && sectionRef.current) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
        }
    }, [forwardedRef]);

    const goToSlide = (newIndex: number) => {
        if (isLockedRef.current) return false;
        if (newIndex === currentIndexRef.current || newIndex < 0 || newIndex > 3) return false;
        
        const now = Date.now();
        if (now - lastChangeTime.current < 800) return false;
        
        isLockedRef.current = true;
        lastChangeTime.current = now;
        currentIndexRef.current = newIndex;
        setCurrentIndex(newIndex);
        
        setTimeout(() => {
            isLockedRef.current = false;
        }, 900);
        
        return true;
    };

    // Snap to section when it enters viewport - prevents skipping
    // Only activate after user has scrolled from the top
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let hasUserScrolled = false;
        let observer: IntersectionObserver | null = null;

        // Wait for user to start scrolling before enabling snap
        const handleFirstScroll = () => {
            // Only consider it a real scroll if we've moved away from the top
            if (window.scrollY > 100) {
                hasUserScrolled = true;
            }
        };

        // Delayed setup to avoid triggering on page load
        const setupTimer = setTimeout(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        // Only snap if user has scrolled and we haven't snapped yet
                        if (entry.isIntersecting && !hasSnappedRef.current && hasUserScrolled) {
                            const rect = section.getBoundingClientRect();
                            // Only snap if we're scrolling into it from above
                            if (rect.top > 0 && rect.top < window.innerHeight * 0.5) {
                                hasSnappedRef.current = true;
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                        // Reset snap flag when leaving section completely
                        if (!entry.isIntersecting) {
                            const rect = section.getBoundingClientRect();
                            if (rect.bottom < 0) {
                                hasSnappedRef.current = false;
                            }
                        }
                    });
                },
                { threshold: [0.1, 0.2, 0.3] }
            );

            observer.observe(section);
        }, 500); // Wait 500ms before enabling

        window.addEventListener('scroll', handleFirstScroll, { passive: true });

        return () => {
            clearTimeout(setupTimer);
            window.removeEventListener('scroll', handleFirstScroll);
            if (observer) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleWheel = (e: WheelEvent) => {
            const rect = section.getBoundingClientRect();
            // Wider catch zone - section is "in view" if any part is visible
            const isEntering = rect.top > 0 && rect.top < window.innerHeight;
            const isInView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;
            
            // If entering the section from above while scrolling down, snap to it
            if (isEntering && e.deltaY > 0 && !hasSnappedRef.current) {
                e.preventDefault();
                hasSnappedRef.current = true;
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            
            if (!isInView) return;
            
            const idx = currentIndexRef.current;
            const canScrollDown = idx < 3;
            const canScrollUp = idx > 0;
            const scrollingDown = e.deltaY > 0;
            
            if ((scrollingDown && canScrollDown) || (!scrollingDown && canScrollUp)) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!isLockedRef.current) {
                    goToSlide(scrollingDown ? idx + 1 : idx - 1);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchProcessedRef.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = section.getBoundingClientRect();
            const isEntering = rect.top > 0 && rect.top < window.innerHeight;
            const isInView = rect.top <= 50 && rect.bottom >= window.innerHeight - 50;
            
            const deltaY = touchStartY.current - e.touches[0].clientY;
            
            // If entering the section from above while swiping down, snap to it
            if (isEntering && deltaY > 30 && !hasSnappedRef.current) {
                e.preventDefault();
                hasSnappedRef.current = true;
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            
            if (!isInView) return;

            const idx = currentIndexRef.current;
            const canScrollDown = idx < 3;
            const canScrollUp = idx > 0;
            
            if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
                e.preventDefault();
                
                if (!touchProcessedRef.current && !isLockedRef.current && Math.abs(deltaY) > 60) {
                    touchProcessedRef.current = true;
                    
                    if (deltaY > 0 && canScrollDown) {
                        goToSlide(idx + 1);
                    } else if (deltaY < 0 && canScrollUp) {
                        goToSlide(idx - 1);
                    }
                }
            }
        };

        const handleTouchEnd = () => {
            touchProcessedRef.current = false;
        };

        // Use window-level listeners to catch scroll before it happens
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: "300vh", backgroundColor: '#ffffff' }}
        >
            {/* Sticky container - single viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: '#ffffff' }}>

                {/* Section header - hidden on mobile to avoid overlap */}
                <div className="absolute top-24 md:top-28 left-8 md:left-16 lg:left-24 z-20 hidden md:block">
                    <p className="text-[#5A6FA3] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-2">
                        How It Works
                    </p>
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#311717]"
                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                    >
                        Simple Steps to Love
                    </h2>
                </div>

                {/* Content area */}
                <div className="relative h-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 flex items-center">
                    {features.map((feature, index) => (
                        <FeatureContent
                            key={index}
                            feature={feature}
                            index={index}
                            currentIndex={currentIndex}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
});

function FeatureContent({
    feature,
    index,
    currentIndex,
}: {
    feature: typeof features[0];
    index: number;
    currentIndex: number;
}) {
    const isActive = currentIndex === index;
    const isPast = index < currentIndex;
    const isFuture = index > currentIndex;

    return (
        <div
            className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 pt-20"
            style={{
                opacity: isActive ? 1 : 0,
                transform: `translateX(${isPast ? -80 : isFuture ? 80 : 0}px) scale(${isActive ? 1 : 0.95})`,
                pointerEvents: isActive ? "auto" : "none",
                transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                willChange: 'transform, opacity',
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-[1400px]">
                {/* Text content */}
                <div className="space-y-5 md:space-y-6">
                    {/* Mobile header - shown inline with content */}
                    <div className="md:hidden mb-4">
                        <p className="text-[#5A6FA3] text-xs font-medium tracking-[0.2em] uppercase mb-1">
                            How It Works
                        </p>
                        <h2
                            className="text-xl font-bold text-[#311717]"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            Simple Steps to Love
                        </h2>
                    </div>

                    {/* Large step number */}
                    <div className="flex items-center gap-4">
                        <span
                            className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#A4B8E7]"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            {feature.step}
                        </span>
                        <div className="h-[2px] flex-1 max-w-[100px] bg-gradient-to-r from-[#A4B8E7] to-transparent" />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#311717] leading-[1.15]"
                        style={{ fontFamily: "'Novaklasse', sans-serif" }}
                    >
                        {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-[#311717]/70 leading-relaxed max-w-[480px]">
                        {feature.description}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToWaitlist}
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#5A6FA3] text-white font-medium text-base hover:bg-[#4A5E96] hover:gap-4 shadow-lg shadow-[#5A6FA3]/20 transition-all duration-300"
                    >
                        Get Started
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Image */}
                <div className="relative flex items-center justify-center">
                    {/* Background decoration */}
                    <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-[#A4B8E7]/30 to-[#5A6FA3]/10 rounded-[2rem] -rotate-3" />
                    <div className="absolute w-[85%] h-[85%] bg-white/50 rounded-[2rem] rotate-2 shadow-xl" />

                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="relative w-full max-w-[380px] lg:max-w-[450px] h-auto aspect-square object-cover rounded-[1.5rem] shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
}

// Testimonials data
const testimonials = [
    {
        name: "Sarah M.",
        role: "Found her soulmate",
        content: "OMG!! We were in the same class and I have a lowkey crush, but but but introvert me, I can't express him. By chance I posted the confession on Metll and boom we are together now.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "James L.",
        role: "Matched with his crush",
        content: "Met on a group trip to Himalayas. She was my trekmate and I liked her in first glance, and wrote a confession for her, next day she also wrote one for me and the rest is history",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Emily R.",
        role: "In a relationship",
        content: "Tired of swiping left and right on other dating apps, remembered my crush of college and he already has a confession for me. Now we are together forever...",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Michael K.",
        role: "Engaged!",
        content: "he used to come daily morning for jogging in near by park, finally gathered the courage to express on METLL, and the confession was already waiting for me...",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Jessica T.",
        role: "Happily married",
        content: "MetLL changed my life. I found my soulmate here. Thank you for creating such a wonderful platform.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "David W.",
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
        if (forwardedRef && typeof forwardedRef === 'object' && sectionRef.current) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
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
            className="py-24 md:py-16 lg:py-20 bg-[#A4B8E7] relative overflow-hidden cursor-default md:min-h-screen md:flex md:items-center"
            onClick={handleTestimonialClick}
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#A4B8E7] via-[#B5C7EF] to-[#A4B8E7]" />

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
                {/* Section header */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-[#311717] text-sm md:text-base font-medium tracking-[0.15em] uppercase mb-12 md:mb-16 text-left"
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                >
                    What Our Users Say
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
                            <p className="text-[#311717]/80 text-base md:text-lg font-medium italic text-left" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
                                    width: index === activeIndex ? `${progress}%` : index < activeIndex ? "100%" : "0%"
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
