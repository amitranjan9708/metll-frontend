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

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-[#311717] mb-8 text-center" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
          About MetLL
        </h1>

        <div className="space-y-6 text-lg md:text-xl text-[#311717]/90 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p>
            MetLL is revolutionizing the way people connect by transforming secret crushes into meaningful relationships. We understand that expressing romantic feelings can be daunting, filled with fear of rejection and social awkwardness. That's why we created a platform where you can confess your feelings anonymously, knowing that your identity remains protected until mutual interest is confirmed.
          </p>

          <p>
            Our innovative AI-powered matching system analyzes confessions in real-time across schools, colleges, offices, and locations. When two people confess about each other, our intelligent algorithm detects the mutual connection and instantly reveals the match. This approach eliminates the anxiety of one-sided confessions while preserving the excitement of discovering that your feelings are reciprocated.
          </p>

          <p>
            At MetLL, we believe that genuine connections shouldn't be hindered by fear or uncertainty. Our privacy-first approach ensures that your confession remains completely anonymous unless both parties express mutual interest. Whether you're crushing on someone from your school days, a colleague at work, or someone you've noticed in your neighborhood, MetLL provides a safe space to take that first step.
          </p>

          <p>
            Our vision extends beyond simple matchmaking. We're building a community where authenticity thrives, where people can be vulnerable without risk, and where love stories begin with mutual respect and genuine interest. Join thousands of users who have already discovered the courage to confess and the joy of mutual connection. Your crush might be waiting for you to make the first move—anonymously, safely, and with MetLL.
          </p>
        </div>
      </div>
    </div>
  );
}
