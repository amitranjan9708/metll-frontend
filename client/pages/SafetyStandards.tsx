import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CSAM_CONTACT_EMAIL = "amitranjan9708195932@gmail.com";

export default function SafetyStandards() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Header - Floating Black Navbar */}
      <header className="fixed top-0 left-0 right-0 w-full px-4 md:px-8 lg:px-12 py-3 md:py-4 z-50 bg-black/95 backdrop-blur-md shadow-lg">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-colors"
            style={{ fontFamily: "'Novaklasse', sans-serif" }}
          >
            MetLL
          </Link>

          <nav
            className="hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg font-normal text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
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

          <button
            className="hidden sm:block px-4 md:px-6 py-2 rounded-full border-2 border-white bg-white text-black text-xs md:text-sm font-medium hover:bg-gray-200 transition-all shadow-md"
            onClick={() => {
              const waitlistSection = document.getElementById("waitlist");
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/#waitlist";
              }
            }}
          >
            JOIN THE WAITLIST
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 relative z-10">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#311717] mb-4"
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
        >
          Child Safety Standards
        </h1>

        <p className="text-lg text-[#311717]/80 mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          MetLL&apos;s published standards against Child Sexual Abuse and Exploitation (CSAE) and our practices for preventing Child Sexual Abuse Material (CSAM).
        </p>

        <div className="mb-8 text-[#311717]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p className="text-sm md:text-base mb-2">
            <strong>Last Updated:</strong> March 3, 2026
          </p>
          <p className="text-sm md:text-base">
            <strong>Effective Date:</strong> March 3, 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {/* Designated contact - prominent for policy compliance */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              Designated Point of Contact (CSAM / Child Safety)
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              The following contact is designated to speak about MetLL&apos;s child sexual abuse material (CSAM) prevention practices and compliance with child safety standards. This contact is ready and able to respond to inquiries from app stores, regulators, and law enforcement.
            </p>
            <div className="bg-[#311717]/5 border border-[#311717]/20 p-6 rounded-lg">
              <p className="text-base md:text-lg text-[#311717]/90 mb-1">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${CSAM_CONTACT_EMAIL}`}
                  className="text-[#5A6FA3] hover:underline font-medium"
                >
                  {CSAM_CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-sm text-[#311717]/70 mt-2">
                Use this address for questions regarding CSAM prevention, CSAE compliance, or child safety practices.
              </p>
            </div>
          </section>

          {/* Commitment */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              1. Our Commitment
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              MetLL has zero tolerance for child sexual abuse and exploitation (CSAE) and child sexual abuse material (CSAM). We are committed to preventing, detecting, and responding to any such content or behavior on our platform in line with applicable laws and app store requirements.
            </p>
          </section>

          {/* Age verification & access */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              2. Age Verification and Access Controls
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Users must be at least 15 years of age to use MetLL. We collect and verify date of birth during registration.</li>
              <li>We use identity and face verification (e.g., liveness and photo matching) to reduce fake accounts and underage access.</li>
              <li>We do not knowingly allow minors below our minimum age to create accounts or access dating features.</li>
            </ul>
          </section>

          {/* Prevention & detection */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3. CSAM Prevention and Detection
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>We do not permit the creation, upload, storage, or sharing of content that constitutes or facilitates child sexual abuse or exploitation.</li>
              <li>We use technical and human review measures where appropriate to detect and remove CSAM and related content.</li>
              <li>User-generated content (including profile photos, stories, and messages) is subject to our terms of service and content policies prohibiting harmful material.</li>
              <li>We respond to valid legal requests and reports from NCMEC, law enforcement, and other authorized bodies in accordance with applicable law.</li>
            </ul>
          </section>

          {/* Reporting */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4. Reporting and Response
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              If you become aware of content or behavior on MetLL that may involve child sexual abuse or exploitation, please report it immediately. We take all reports seriously and will investigate and take action, including removing content, suspending or terminating accounts, and reporting to appropriate authorities where required by law.
            </p>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed">
              To report or for compliance inquiries, contact our designated point of contact:{" "}
              <a href={`mailto:${CSAM_CONTACT_EMAIL}`} className="text-[#5A6FA3] hover:underline font-medium">
                {CSAM_CONTACT_EMAIL}
              </a>
            </p>
          </section>

          {/* Compliance */}
          <section className="mb-16 md:mb-20">
            <h2
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              5. Compliance and Updates
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              We review and update these standards periodically to align with evolving best practices, legal requirements, and app store child safety policies. Our designated contact remains available to discuss our CSAM prevention practices and compliance upon request.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#5A6FA3] overflow-hidden min-h-[500px] md:min-h-[700px] lg:min-h-[800px] mt-20">
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

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 80%)",
          }}
        />

        <div className="relative z-10">
          <div className="pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-12 lg:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
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
                <p className="text-white/50 text-xs">© 2026 MetLL. All rights reserved.</p>
              </div>

              <div className="flex gap-10 sm:gap-16 md:gap-20">
                <div>
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link to="/safety-standards" className="text-white/70 hover:text-white transition-colors text-sm">
                        Child Safety Standards
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Social</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                        Twitter (X)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
