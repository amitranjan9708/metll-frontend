import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#B8C6E8] via-[#A8B8E0] to-[#98AAD8]">
      <header className="w-full px-4 md:px-8 lg:px-12 py-3 md:py-4 relative z-20">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-black text-3xl md:text-4xl font-normal" style={{ fontFamily: "'Lucida Console', Monaco, monospace" }}>
            MetLL
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-black text-xl lg:text-3xl font-normal" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
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

          <button className="px-6 md:px-8 lg:px-11 py-3 rounded-full border-2 border-white backdrop-blur-md bg-white/20 text-white/75 text-sm md:text-base font-normal hover:bg-white/30 transition-all shadow-lg">
            JOIN THE WAITLIST
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-normal text-[#311717] mb-6" style={{ fontFamily: "'Lucida Console', Monaco, monospace" }}>
          About MetLL
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8" style={{ fontFamily: "Narnoor, Georgia, serif" }}>
          This page is a placeholder. Continue prompting to fill in the content you'd like here.
        </p>
      </div>
    </div>
  );
}
