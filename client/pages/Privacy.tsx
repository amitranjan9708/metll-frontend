import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Blue Cloud Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/Ellipse 30.svg"
          alt=""
          className="absolute top-[-10%] right-[-15%] w-[300px] md:w-[500px] lg:w-[700px] h-auto opacity-40 pointer-events-none"
        />
        <img
          src="/Ellipse 31.svg"
          alt=""
          className="absolute bottom-[-15%] left-[-10%] w-[350px] md:w-[550px] lg:w-[750px] h-auto opacity-40 pointer-events-none"
        />
        <img
          src="/Ellipse 30.svg"
          alt=""
          className="absolute top-[30%] left-[-10%] w-[250px] md:w-[400px] lg:w-[500px] h-auto opacity-30 pointer-events-none"
        />
        <img
          src="/Ellipse 31.svg"
          alt=""
          className="absolute bottom-[20%] right-[-10%] w-[300px] md:w-[450px] lg:w-[600px] h-auto opacity-30 pointer-events-none"
        />
      </div>

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
              const waitlistSection = document.getElementById('waitlist');
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#waitlist';
              }
            }}
          >
            JOIN THE WAITLIST
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 relative z-10">
        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#311717] mb-4"
          style={{ fontFamily: "'Novaklasse', sans-serif" }}
        >
          Privacy Policy
        </h1>
        
        <div className="mb-8 text-[#311717]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p className="text-sm md:text-base mb-2">
            <strong>Last Updated:</strong> 15-12-2025
          </p>
          <p className="text-sm md:text-base">
            <strong>Effective Date:</strong> 15-12-2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {/* Section 1 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              1. Introduction
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              MetLL is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
            </p>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>


          {/* Section 2 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              2. Information We Collect
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              2.1 Information You Provide Directly
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Registration & Profile Information:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Full name, email address, phone number, date of birth</li>
              <li>Profile photos and videos</li>
              <li>Bio/about me sections</li>
              <li>Gender identity and sexual orientation</li>
              <li>Location information (city, coordinates)</li>
              <li>Education, profession, and interests</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Confessions & Matching Data:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Private confessions and feelings you share about other users</li>
              <li>Descriptions of crushes or matches</li>
              <li>Preferences for matching (age range, distance, interests)</li>
              <li>Match history and interactions</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Communication:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Messages and chat conversations with other users</li>
              <li>Reports, complaints, and feedback submitted to us</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Verification Data:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Government-issued ID (optional, for profile verification)</li>
              <li>Facial recognition data for photo verification purposes</li>
              <li>Phone/email verification codes</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              2.2 Information Collected Automatically
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Usage Data:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Pages or features you access and time spent</li>
              <li>Search queries within the app</li>
              <li>Button clicks, swipes, and interactions</li>
              <li>Crash reports and error logs</li>
              <li>Session recordings and heatmaps (if enabled)</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Location Data:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Precise GPS location (when app is in use, with permission)</li>
              <li>Approximate location based on IP address</li>
              <li>Location history for proximity-based matching</li>
              <li>Proximity radius data (when you and another user are nearby)</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Cookies & Tracking:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Cookies and similar tracking technologies</li>
              <li>Mobile advertising IDs</li>
              <li>Web beacons and pixels</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              2.3 Information from Third Parties
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Social Media Integration:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>If you sign up via Facebook, Google, or Apple, we receive: profile name, email, profile picture, friends list (if permitted)</li>
              <li>We do not have access to your password</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Third-Party Services:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Data from verification/identity services</li>
              <li>Referral information if you were referred by another user</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Other Users:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Information others share about you (reports, blocks, feedback)</li>
              <li>Photos/screenshots of your profile or messages (user-generated)</li>
            </ul>
          </section>


          {/* Section 3 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3. How We Use Your Information
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.1 Core Service Purposes
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Creating and maintaining your account</li>
              <li>Displaying your profile to other users</li>
              <li>Matching you with other users based on:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-3">
                  <li>Mutual confessions and feelings</li>
                  <li>Proximity/location proximity (when both users are nearby)</li>
                  <li>Shared descriptions and AI-powered semantic matching</li>
                  <li>Your stated preferences</li>
                </ul>
              </li>
              <li>Facilitating messaging and real-time conversations</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Verifying your identity and preventing fraud</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.2 AI & Matching Features
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li><strong>Confession Analysis:</strong> Our AI analyzes the text of confessions from two users to determine semantic similarity and match quality</li>
              <li><strong>Natural Language Processing:</strong> We process confessions to identify sentiment, intent, and compatibility</li>
              <li><strong>Profile Recommendations:</strong> AI suggests potential matches based on your preferences and activity</li>
              <li><strong>Duplicate Detection:</strong> Identifying fake/spam profiles using behavioral analysis</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.3 Safety & Compliance
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Detecting and preventing fraud, abuse, and illegal activity</li>
              <li>Enforcing our Terms of Service</li>
              <li>Responding to legal requests and law enforcement</li>
              <li>Content moderation and filtering inappropriate material</li>
              <li>Blocking users who violate community guidelines</li>
              <li>Age verification (if applicable, for compliance)</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.4 Marketing & Communications
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Sending transactional emails (confirmations, password resets, account updates)</li>
              <li>Promotional emails about new features, special offers (if you opt-in)</li>
              <li>Push notifications about matches and messages (if you opt-in)</li>
              <li>Surveys and feedback requests</li>
              <li>Newsletter (optional subscription)</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.5 Analytics & Improvements
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Analyzing user behavior to improve the Service</li>
              <li>Developing new features and products</li>
              <li>A/B testing and performance optimization</li>
              <li>Generating aggregated/anonymized statistics</li>
              <li>Training and improving AI matching algorithms</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              3.6 Legal Obligations
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Complying with applicable laws and regulations</li>
              <li>Responding to subpoenas, warrants, court orders</li>
              <li>Protecting our rights, privacy, safety, or property</li>
              <li>Establishing, exercising, or defending legal claims</li>
            </ul>
          </section>


          {/* Section 4 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4. How We Share Your Information
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4.1 With Other Users
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Visible Profile Information:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Your public profile (photos, name, age, bio, interests)</li>
              <li>Is shown to users you may match with</li>
              <li>Can be seen by anyone you message or match with</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Confessions & Messages:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Only revealed when mutual match occurs (both users have confessed)</li>
              <li>Messages are visible only to the recipient and you</li>
              <li>Shared with other users you explicitly interact with</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Location Data:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Your proximity status is shared only when both users are within the same radius</li>
              <li>Exact coordinates may not be shared; only "nearby" status</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4.3 Legal Compliance & Safety
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Law enforcement (with valid legal process)</li>
              <li>Government agencies (for legal compliance)</li>
              <li>Emergency responders (if life-safety is at risk)</li>
              <li>Other users (if you consent or report abuse)</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4.4 Business Transfers
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              If MetLL is involved in a merger, acquisition, bankruptcy, or asset sale, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have.
            </p>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              4.5 Aggregated/Anonymized Data
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              We may share de-identified, aggregated analytics (e.g., "73% of users in [CITY] prefer users aged 25-30") with partners, researchers, or the public without restriction.
            </p>
          </section>


          {/* Section 5 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              5. Data Retention
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              5.1 Active Accounts
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Profile data is retained as long as your account is active</li>
              <li>Messages and confessions are stored indefinitely (unless you delete them)</li>
              <li>Location history is retained for 30 days</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              5.2 Deleted Accounts
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Profile information is deleted within 30 business days</li>
              <li>Messages and confessions may remain visible to match partners (or be anonymized)</li>
              <li>Aggregated, non-identifiable data is retained indefinitely</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              5.3 Legal Holds
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>If we receive a legal hold or court order, we retain information as required by law</li>
              <li>We may retain data longer if necessary for safety, fraud prevention, or legal compliance</li>
            </ul>
          </section>


          {/* Section 6 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6. Your Privacy Rights & Controls
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6.1 Access & Portability
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Access and download all your personal data in a portable format</li>
              <li>Request a copy of your profile, messages, and confessions</li>
              <li>Data export available at: <strong>[SETTINGS] → [Privacy] → [Download My Data]</strong></li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6.2 Correction & Deletion
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>You can edit your profile information at any time</li>
              <li>You can delete specific messages, photos, or confessions</li>
              <li>You can request full account deletion by contacting: <strong>support@metll.in</strong></li>
              <li>Note: Deleted messages may remain visible to recipients</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6.3 Opt-Out & Preferences
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Email & Marketing:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Unsubscribe from promotional emails via the link in each email</li>
              <li>Manage preferences at: <strong>[SETTINGS] → [Notifications] → [Email Preferences]</strong></li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Push Notifications:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Disable push notifications in app settings or device settings</li>
              <li><strong>[SETTINGS] → [Notifications] → [Toggle Options]</strong></li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Location Sharing:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Turn off location services in app settings or device settings</li>
              <li>Proximity-based matching will be limited or disabled</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Analytics & Tracking:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Opt out of analytics tracking: <strong>[SETTINGS] → [Privacy] → [Analytics]</strong></li>
              <li>Note: Some data collection is necessary for the Service to function</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Cookies:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Manage cookie preferences in browser settings</li>
              <li>MetLL does not use cookies for tracking (cookies are session-based only)</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6.4 Do Not Track
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              Some browsers include a "Do Not Track" (DNT) feature. Our Service does not respond to DNT signals at this time.
            </p>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              6.5 Regional Privacy Rights
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>EU/EEA (GDPR):</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to object to processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>California (CCPA/CPRA):</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of "sale" of personal information</li>
              <li>Right to non-discrimination for exercising rights</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Canada (PIPEDA):</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Right to access and correct personal information</li>
              <li>Right to request deletion</li>
            </ul>
          </section>


          {/* Section 7 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              7. Data Security
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              7.1 Security Measures
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              We implement industry-standard security practices:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit; AES-256 encryption for sensitive data at rest</li>
              <li><strong>Access Control:</strong> Role-based access restrictions; only authorized employees access data</li>
              <li><strong>Authentication:</strong> Password hashing (bcrypt/argon2); two-factor authentication (2FA) available</li>
              <li><strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
              <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
              <li><strong>Data Backups:</strong> Encrypted backups stored in multiple secure locations</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              7.2 Limitations
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>No Perfect Security:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>While we use reasonable security measures, no system is 100% secure</li>
              <li>Transmission over the internet carries inherent risk</li>
              <li>You are responsible for protecting your password and account access</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Third-Party Risk:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>We cannot guarantee the security of third-party services (payment processors, cloud providers, etc.)</li>
              <li>Each third party has its own privacy policy</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              7.3 Security Breach Notification
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              If we discover a security breach affecting your data:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>We will notify you via email as soon as practical</li>
              <li>We will comply with applicable legal notification requirements</li>
              <li>Notification will include what information was affected and steps we are taking</li>
            </ul>
          </section>


          {/* Section 8 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              8. Children & Minors
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              8.1 Age Requirement
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              MetLL is <strong>not intended for users under 16 years old</strong>. We do not knowingly collect information from minors.
            </p>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              8.2 Parental Controls
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              If you believe a child has created an account:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Report it immediately to: <strong>support@metll.in</strong></li>
              <li>We will delete the account and associated data promptly</li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              8.3 COPPA Compliance
            </h3>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              We comply with the Children's Online Privacy Protection Act (COPPA). If we learn we have collected data from a child under 13 without verifiable parental consent, we will delete it immediately.
            </p>
          </section>


          {/* Section 9 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              9. Third-Party Links & Services
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              MetLL may contain links to third-party websites, apps, and services. <strong>We are not responsible for their privacy practices.</strong>
            </p>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              Review their privacy policies before providing information:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Social media platforms (Facebook, Google, Apple)</li>
              <li>Payment processors</li>
              <li>Analytics services</li>
              <li>Other dating apps or integrated services</li>
            </ul>
          </section>


          {/* Section 10 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              10. Contact Us
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              10.1 Privacy Inquiries
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Privacy Officer:</strong>
            </p>
            <ul className="list-none mb-4 space-y-2 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Name: Sankalp</li>
              <li>Email: support@metll.in</li>
              <li>Address: Pune, India</li>
              <li>Phone: +91 6353264881</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Data Protection Officer (GDPR):</strong>
            </p>
            <ul className="list-none mb-4 space-y-2 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Email: support@metll.in</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>General Support:</strong>
            </p>
            <ul className="list-none mb-4 space-y-2 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Email: support@metll.in</li>
              <li>In-app support: <strong>[SETTINGS] → [Help & Support]</strong></li>
            </ul>

            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              10.2 Response Times
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Privacy requests: <strong>30 days</strong></li>
              <li>Breach notifications: <strong>As soon as practical</strong></li>
              <li>Complaint resolution: <strong>30-60 days</strong></li>
            </ul>
          </section>


          {/* Section 11 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              11. Changes to This Policy
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              We may update this Privacy Policy to reflect:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Changes in our practices</li>
              <li>New features or services</li>
              <li>Legal or regulatory requirements</li>
            </ul>
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Notification:</strong> We will notify you of material changes via:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Email notification</li>
              <li>In-app notification</li>
              <li>Updated "Last Updated" date</li>
            </ul>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              <strong>Your Continued Use</strong> of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>


          {/* Section 12 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              12. Appendices
            </h2>
            
            <h3 
              className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              Appendix B: Cookie Policy
            </h3>
            
            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Cookies Used:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li><strong>Session Cookies:</strong> For maintaining login state (non-tracking)</li>
              <li><strong>Functionality Cookies:</strong> Remembering preferences</li>
              <li><strong>Third-party:</strong> Payment processor & analytics provider cookies</li>
            </ul>

            <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
              <strong>Manage Cookies:</strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
              <li>Browser settings to disable cookies</li>
              <li>MetLL cookie preferences: <strong>[SETTINGS] → [Cookies]</strong></li>
            </ul>
          </section>


          {/* Section 13 */}
          <section className="mb-16 md:mb-20">
            <h2 
              className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              13. Acknowledgment
            </h2>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
              <strong>By using MetLL, you acknowledge that you have read and understood this Privacy Policy.</strong>
            </p>
            <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-8">
              If you have questions or concerns, please contact us at <strong>support@metll.in</strong>.
            </p>
            
            <div className="mt-8 pt-6 border-t border-[#311717]/20">
              <p className="text-sm md:text-base text-[#311717]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <strong>Effective Date:</strong> 15-12-2025<br />
                <strong>Last Updated:</strong> 15-12-2025<br />
                <strong>Version:</strong> 1.0
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#5A6FA3] overflow-hidden min-h-[500px] md:min-h-[700px] lg:min-h-[800px] mt-20">
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
                    <li><Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm">About us</Link></li>
                    <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy</Link></li>
                    <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact</Link></li>
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
      </footer>
    </div>
  );
}

