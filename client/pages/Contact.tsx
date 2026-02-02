import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to homepage with hash to trigger scroll
    navigate("/#footer");

    // Additional fallback: wait for page to load then scroll
    const scrollToFooter = () => {
      setTimeout(() => {
        const footer = document.querySelector('footer') ||
          document.querySelector('[class*="FooterSection"]') ||
          document.querySelector('section:last-of-type');

        if (footer) {
          footer.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // If footer not found, scroll to bottom
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
      }, 500);
    };

    scrollToFooter();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#B8C6E8] via-[#A8B8E0] to-[#98AAD8] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#311717] mb-4" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
          Redirecting to Contact Section...
        </h1>
        <p className="text-lg text-[#311717]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Taking you to our contact information
        </p>
      </div>
    </div>
  );
}
