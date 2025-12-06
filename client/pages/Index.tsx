import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AnimatedCharactersLoginPage from "@/components/ui/animated-characters-login-page";
import { ConicGradientButton } from "@/components/ui/conic-gradient-button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Index() {
    const [isDarkNavbar, setIsDarkNavbar] = useState(false);
    const featuresRef = useRef<HTMLElement>(null);
    const testimonialsRef = useRef<HTMLElement>(null);
    const loginRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const navbarHeight = 60;

            const featuresTop = featuresRef.current?.offsetTop ?? Infinity;
            const featuresBottom = featuresTop + (featuresRef.current?.offsetHeight ?? 0);
            const loginTop = loginRef.current?.offsetTop ?? Infinity;
            const loginBottom = loginTop + (loginRef.current?.offsetHeight ?? 0);
            const footerTop = footerRef.current?.offsetTop ?? Infinity;

            const currentPosition = scrollY + navbarHeight;

            // Dark navbar (black bg, white text) when over:
            // - Features section (white bg)
            // - Login section (white right side)
            // Light navbar (white bg, dark text) when over:
            // - Hero section (blue bg)
            // - Testimonials section (blue bg)
            // - Footer section (blue bg)

            const isOverFeatures = currentPosition >= featuresTop && currentPosition < featuresBottom;
            const isOverLogin = currentPosition >= loginTop && currentPosition < footerTop;

            setIsDarkNavbar(isOverFeatures || isOverLogin);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full bg-[#A4B8E7] relative pt-14">
            <Header isDark={isDarkNavbar} />
            <HeroSection />
            <FeaturesSection ref={featuresRef} />
            <TestimonialsSection ref={testimonialsRef} />
            <LoginSection ref={loginRef} />
            <FooterSection ref={footerRef} />
        </div>
    );
}

import { forwardRef } from "react";

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
                                    <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
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


function Header({ isDark }: { isDark: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 w-full px-4 md:px-8 lg:px-12 py-2 z-50 backdrop-blur-md shadow-sm transition-all duration-700 ease-in-out ${isDark ? 'bg-black/95' : 'bg-white/95'
                }`}
        >
            <div className="max-w-[1500px] mx-auto flex items-center justify-between">
                <Link
                    to="/"
                    className={`text-2xl sm:text-3xl md:text-4xl font-semibold transition-colors duration-700 ease-in-out ${isDark ? 'text-white' : 'text-[#311717]'}`}
                    style={{ fontFamily: "'Novaklasse', sans-serif" }}
                >
                    MetLL
                </Link>

                <nav
                    className={`hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg font-normal transition-colors duration-700 ease-in-out ${isDark ? 'text-white' : 'text-[#311717]'}`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                    <Link to="/" className="hover:opacity-70 transition-opacity">
                        Home
                    </Link>
                    <Link to="/about" className="hover:opacity-70 transition-opacity">
                        About
                    </Link>
                    <Link to="/contact" className="hover:opacity-70 transition-opacity">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={scrollToWaitlist}
                        className={`hidden sm:block px-4 md:px-6 py-2 rounded-full border-2 text-xs md:text-sm font-medium transition-all shadow-md ${isDark
                            ? 'border-white bg-white text-black hover:bg-gray-200'
                            : 'border-[#5A6FA3] bg-[#5A6FA3] text-white hover:bg-[#4A5E96]'
                            }`}
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
                    <nav className={`flex flex-col gap-4 ${isDark ? 'text-white' : 'text-[#311717]'}`}>
                        <Link to="/" className="py-2 hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/about" className="py-2 hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/contact" className="py-2 hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                            Contact Us
                        </Link>
                        <button
                            onClick={() => { scrollToWaitlist(); setMobileMenuOpen(false); }}
                            className={`sm:hidden mt-2 px-4 py-3 rounded-full border-2 text-sm font-medium transition-all ${isDark
                                ? 'border-white bg-white text-black'
                                : 'border-[#5A6FA3] bg-[#5A6FA3] text-white'
                                }`}
                        >
                            JOIN THE WAITLIST
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

function HeroSection() {
    return (
        <section className="relative w-full min-h-[40rem] md:min-h-[63rem] flex items-start justify-center px-4 md:px-8 lg:px-12 pt-20 md:pt-28 lg:pt-32 pb-8 md:pb-12 overflow-hidden">
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

            {/* Eiffel Tower - enlarged to overlap navbar */}
            <div className="absolute left-[-20%] lg:left-[-10%] top-[15%] z-10 md:z-20 pointer-events-none" style={{ transform: 'translateY(calc(-25% + 80px))' }}>
                <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/eb89dd7aca05fa3afa46375542789c2eadeb70ea?width=2070"
                    alt="Eiffel Tower illustration"
                    className="w-auto h-[600px] md:h-[1035px] lg:h-[1035px]"
                />
            </div>

            {/* Main content area - centered text at top */}
            <div className="max-w-[1500px] w-full mx-auto relative z-20 flex flex-col items-center pt-4 md:-mt-8 lg:-mt-16 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-semibold leading-tight text-[#311717] text-center" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
                    Confess. Connect. Date.
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white text-center mt-4 md:mt-6 max-w-[600px]" style={{ fontFamily: "Narnoor, Georgia, serif" }}>
                    Confess Anomously , we match when its mutual.
                </p>

                {/* Mobile-only white button */}
                <button
                    onClick={scrollToWaitlist}
                    className="md:hidden mt-8 px-10 py-4 bg-white text-[#311717] rounded-full font-semibold text-sm shadow-2xl transition-all z-30"
                    style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                >
                    JOIN THE WAITLIST
                </button>

                {/* Desktop ConicGradientButton */}
                <ConicGradientButton
                    lightColor="#ffffff"
                    backgroundColor="rgba(200, 215, 245, 0.5)"
                    borderWidth={2}
                    duration={6}
                    blurAmount={4}
                    className="hidden md:flex mt-6 md:mt-8 h-auto text-sm md:text-base"
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
}

const features = [
    {
        step: "01",
        title: "Confess Anonymously",
        description: "Share your feelings without revealing your identity. Your confession stays completely private until there's a mutual match.",
        image: "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww"
    },
    {
        step: "02",
        title: "Smart Matching",
        description: "Our intelligent algorithm works behind the scenes. When someone confesses about you too, that's when the magic happens.",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/7af30a2a8d500ada144f554e62b4d84cd6010267?width=519"
    },
    {
        step: "03",
        title: "Reveal & Connect",
        description: "Both parties are instantly notified when there's a mutual confession. Start your conversation with confidence.",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/62d2788c50a1d94ab391f6ece6bbe53236540d5f?width=1754"
    },
    {
        step: "04",
        title: "Build Real Bonds",
        description: "Transform anonymous confessions into meaningful relationships. What starts as a secret crush becomes your love story.",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/c1558402295e4bb94f7781e7c2cb19961b0d991e?width=1648"
    }
];

const FeaturesSection = forwardRef<HTMLElement>((_, forwardedRef) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Combine refs for both internal use and forwarding
    useEffect(() => {
        if (forwardedRef && typeof forwardedRef === 'object' && sectionRef.current) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
        }
    }, [forwardedRef]);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [animProgress, setAnimProgress] = useState(0); // 0 = fully showing current, 1 = fully transitioned
    const [targetIndex, setTargetIndex] = useState(0);
    const animatingRef = useRef(false);
    const rafRef = useRef<number | null>(null);

    // Calculate target index from scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollStart = rect.top;
            const totalScrollDistance = sectionHeight - viewportHeight;

            let newTarget = 0;
            if (scrollStart > 0) {
                newTarget = 0;
            } else if (scrollStart < -totalScrollDistance) {
                newTarget = 3;
            } else {
                const progress = Math.abs(scrollStart) / totalScrollDistance;
                newTarget = Math.min(Math.floor(progress * 4), 3);
            }

            setTargetIndex(newTarget);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-animate when target changes
    useEffect(() => {
        if (targetIndex === displayIndex) return;

        // Cancel any ongoing animation
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        const startTime = performance.now();
        const duration = 500; // 500ms animation
        const fromIndex = displayIndex;
        const toIndex = targetIndex;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimProgress(eased);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                // Animation complete - update to new slide
                setDisplayIndex(toIndex);
                setAnimProgress(0);
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [targetIndex]); // Only depend on targetIndex, not displayIndex

    // Determine which slides to show during animation
    const isAnimating = animProgress > 0;
    const goingForward = targetIndex > displayIndex;
    const exitingIndex = isAnimating ? displayIndex : null;
    const enteringIndex = isAnimating ? targetIndex : null;
    const activeIndex = isAnimating ? displayIndex : displayIndex;

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: "400vh", backgroundColor: '#ffffff' }}
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
                            activeIndex={activeIndex}
                            exitingIndex={exitingIndex}
                            enteringIndex={enteringIndex}
                            animProgress={animProgress}
                            goingForward={goingForward}
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
    activeIndex,
    exitingIndex,
    enteringIndex,
    animProgress,
    goingForward
}: {
    feature: typeof features[0];
    index: number;
    activeIndex: number;
    exitingIndex: number | null;
    enteringIndex: number | null;
    animProgress: number;
    goingForward: boolean;
}) {
    const isActive = activeIndex === index && exitingIndex === null;
    const isExiting = exitingIndex === index;
    const isEntering = enteringIndex === index;

    let opacity = 0;
    let translateX = 0;
    let scale = 1;
    let blur = 0;

    if (isActive) {
        // Current slide, fully visible
        opacity = 1;
        translateX = 0;
        scale = 1;
        blur = 0;
    } else if (isExiting) {
        // Exiting slide - fade out and slide left (or right if going backward)
        opacity = 1 - animProgress;
        translateX = goingForward ? -animProgress * 150 : animProgress * 150;
        scale = 1 - animProgress * 0.1;
        blur = animProgress * 12;
    } else if (isEntering) {
        // Entering slide - fade in and slide from right (or left if going backward)
        opacity = animProgress;
        translateX = goingForward ? 150 - animProgress * 150 : -150 + animProgress * 150;
        scale = 0.9 + animProgress * 0.1;
        blur = (1 - animProgress) * 12;
    } else {
        // Hidden
        opacity = 0;
        translateX = index > activeIndex ? 150 : -150;
        scale = 0.9;
        blur = 12;
    }

    const isVisible = opacity > 0.01;

    return (
        <div
            className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 pt-20"
            style={{
                opacity,
                transform: `translateX(${translateX}px) scale(${scale})`,
                filter: `blur(${blur}px)`,
                pointerEvents: isActive ? "auto" : "none",
                visibility: isVisible ? "visible" : "hidden",
                willChange: "transform, opacity, filter",
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
        content: "I was skeptical at first, but the anonymous confession feature made it so easy to express myself. We've been dating for 6 months now!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "James L.",
        role: "Matched with his crush",
        content: "The smart matching algorithm is incredible. It felt like magic when we both matched. Highly recommend!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Emily R.",
        role: "In a relationship",
        content: "Finally, a dating app that focuses on genuine connections. The experience is seamless and heartfelt.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
    },
    {
        name: "Michael K.",
        role: "Engaged!",
        content: "I love how privacy-focused this app is. It gave me the confidence to reach out to my crush. Now we're engaged!",
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

    const handleProgressClick = (index: number) => {
        setActiveIndex(index);
        setProgress(0);
    };

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#A4B8E7] relative overflow-hidden">
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

            <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                {/* Section header */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-[#311717] text-sm md:text-base font-medium tracking-[0.15em] uppercase mb-16"
                >
                    What Our Users Say
                </motion.p>

                {/* Testimonial content */}
                <div className="min-h-[300px] md:min-h-[350px] relative">
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
                            <div className="mb-8">
                                <svg
                                    className="w-12 h-12 md:w-16 md:h-16 text-[#311717]/80"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>
                            </div>

                            {/* Testimonial text */}
                            <p
                                className="text-[#311717] text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-10"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                {testimonials[activeIndex].content}
                            </p>

                            {/* Author name */}
                            <p className="text-[#311717]/80 text-base md:text-lg font-medium">
                                {testimonials[activeIndex].name}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress bars */}
                <div className="flex gap-3 md:gap-4 mt-16">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleProgressClick(index)}
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
