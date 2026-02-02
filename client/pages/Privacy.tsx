import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Privacy() {
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
                        <strong>Last Updated:</strong> February 2, 2026
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Effective Date:</strong> February 2, 2026
                    </p>
                </div>

                <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {/* Introduction */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            Introduction
                        </h2>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Welcome to Metll. This Privacy Policy explains how Metll (&quot;the App&quot;) collects, uses, stores, shares, and protects your personal information when you use our mobile dating application and related services.
                        </p>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed">
                            By creating an account and using Metll, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our practices, please do not use our services.
                        </p>
                    </section>


                    {/* Section 1 - Information We Collect */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1. Information We Collect
                        </h2>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1.1 Information You Provide Directly
                        </h3>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Account Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Phone number (required for registration and verification)</li>
                            <li>Name</li>
                            <li>Email address (optional)</li>
                            <li>Password (stored in encrypted form)</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Profile Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Bio/About me text</li>
                            <li>Age and date of birth</li>
                            <li>Gender identity</li>
                            <li>Height</li>
                            <li>Profile photos and additional photos</li>
                            <li>Verification selfie/video for face verification</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Background Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Current city and past city</li>
                            <li>School name, class, section, city, and state</li>
                            <li>College name, department, and location</li>
                            <li>Office/workplace name, designation, department, and location</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Dating Preferences:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Relationship type preference (friends first, monogamy, non-monogamy, etc.)</li>
                            <li>Dating intentions (casual, serious, marriage, open to all)</li>
                            <li>Gender preference for matches</li>
                            <li>Age range preference</li>
                            <li>Maximum distance preference</li>
                            <li>Lifestyle preferences (children, family plans, smoking, drinking, drugs, politics, education)</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Personality Responses:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Answers to situational questions and prompts displayed on your profile</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Communication Content:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Text messages, voice notes, audio messages</li>
                            <li>Images, videos, and GIFs shared in chats</li>
                            <li>Support tickets and feedback</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Confession Feature Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Crush&apos;s first name and institution details</li>
                            <li>Anonymous confession content</li>
                            <li>Proximity-based confession descriptions (clothing, accessories, physical characteristics)</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Story Content:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Photos and videos uploaded to stories</li>
                            <li>Text overlays and music selections</li>
                        </ul>


                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1.2 Information Collected Automatically
                        </h3>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Device Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Device type, model, and operating system</li>
                            <li>Unique device identifiers</li>
                            <li>Push notification tokens (FCM tokens)</li>
                            <li>Platform (Android/iOS)</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Usage Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>App interactions (swipes, matches, messages)</li>
                            <li>Features accessed and time spent</li>
                            <li>Last active timestamp</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Location Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Precise location (latitude/longitude) when you enable location services</li>
                            <li>Approximate location derived from IP address</li>
                            <li>Location is used for showing nearby profiles and proximity-based features</li>
                        </ul>


                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1.3 Information from Third Parties
                        </h3>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Verification Services:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>AWS Rekognition face verification results and similarity scores</li>
                            <li>Liveness detection session data</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Cloud Storage:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Cloudinary stores your photos and media with unique identifiers</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Real-Time Communication:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Agora provides voice/video calling infrastructure</li>
                            <li>Socket.io enables real-time messaging</li>
                        </ul>
                    </section>


                    {/* Section 2 - How We Use Your Information */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2. How We Use Your Information
                        </h2>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2.1 Provide Core Services
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Create and manage your account</li>
                            <li>Display your profile to potential matches</li>
                            <li>Facilitate matching based on preferences and compatibility</li>
                            <li>Enable messaging and communication between matched users</li>
                            <li>Process voice and video calls</li>
                            <li>Deliver proximity-based confession matching using AI</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2.2 Safety and Verification
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Verify your identity through face verification</li>
                            <li>Detect and prevent fake profiles, fraud, and abuse</li>
                            <li>Review and respond to user reports of inappropriate behavior</li>
                            <li>Ensure users are of legal age to use dating services</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2.3 Improve and Personalize
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Analyze usage patterns to improve app features</li>
                            <li>Personalize match recommendations</li>
                            <li>Test new features and functionality</li>
                            <li>Resolve technical issues and bugs</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2.4 Communications
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Send push notifications about matches, messages, and calls</li>
                            <li>Send important service updates</li>
                            <li>Respond to support inquiries</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2.5 Referral Program
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Track referral codes and reward eligible users</li>
                            <li>Manage coffee date ticket rewards</li>
                        </ul>
                    </section>


                    {/* Section 3 - How We Share Your Information */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            3. How We Share Your Information
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            We do not sell your personal information. We share information only in the following limited circumstances:
                        </p>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            3.1 With Other Users
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Your profile information is visible to other users you may match with</li>
                            <li>Messages and confessions are shared with matched users</li>
                            <li>Stories are visible to users who view your profile</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            3.2 With Service Providers
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>AWS Rekognition:</strong> For face verification and liveness detection</li>
                            <li><strong>Cloudinary:</strong> For photo and video storage</li>
                            <li><strong>Firebase/FCM:</strong> For push notifications</li>
                            <li><strong>Agora:</strong> For voice and video calling</li>
                            <li><strong>Groq:</strong> For AI-powered confession matching</li>
                            <li><strong>Render:</strong> For backend hosting</li>
                        </ul>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            3.3 For Legal Reasons
                        </h3>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>To comply with legal obligations, court orders, or government requests</li>
                            <li>To protect the rights, property, and safety of Metll and our users</li>
                            <li>To prevent fraud, abuse, or illegal activity</li>
                        </ul>
                    </section>


                    {/* Section 4 - Data Storage and Security */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            4. Data Storage and Security
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Where We Store Data:</strong> Your data is stored on secure servers provided by Render (backend) and Cloudinary (media files). AWS Rekognition processes verification data but does not permanently store your photos.
                        </p>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Security Measures:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Passwords are encrypted using industry-standard hashing (bcrypt)</li>
                            <li>Data transmission is encrypted using HTTPS/TLS</li>
                            <li>Access to user data is restricted to authorized personnel only</li>
                            <li>Regular security audits and updates</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Data Retention:</strong> We retain your data for as long as your account is active. If you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal purposes.
                        </p>
                    </section>


                    {/* Section 5 - Your Rights and Choices */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            5. Your Rights and Choices
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            You have the following rights regarding your personal information:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Delete your account and personal data</li>
                            <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                            <li><strong>Opt-Out:</strong> Disable push notifications or location services</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            To exercise these rights, contact us at <strong>support@metll.in</strong> or use the in-app settings.
                        </p>
                    </section>


                    {/* Section 6 - Age Requirements */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            6. Age Requirements and Child Safety
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Minimum Age:</strong> You must be at least <strong>15 years old</strong> to use Metll.
                        </p>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Child Safety:</strong> We do not knowingly collect personal information from children under 15. If we discover that a child under 15 has provided us with personal information, we will delete it immediately.
                        </p>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            If you believe a child under 15 is using our services, please contact us at <strong>support@metll.in</strong>.
                        </p>
                    </section>


                    {/* Section 7 - Sensitive Data */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            7. Sensitive Data Handling
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            We collect certain sensitive information with your explicit consent:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Biometric Data:</strong> Face verification photos/videos are processed by AWS Rekognition and not permanently stored by us</li>
                            <li><strong>Precise Location:</strong> Used only when you enable location services for proximity matching</li>
                            <li><strong>Health Information:</strong> Optional lifestyle preferences (smoking, drinking, drugs) are stored securely</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            You can withdraw consent for sensitive data processing at any time by deleting your account or contacting support.
                        </p>
                    </section>


                    {/* Section 8 - Third-Party Links */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            8. Third-Party Links and Services
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                    </section>


                    {/* Section 9 - Changes to Privacy Policy */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            9. Changes to This Privacy Policy
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Posting the updated policy in the app</li>
                            <li>Sending a push notification or email</li>
                            <li>Updating the &quot;Last Updated&quot; date at the top of this policy</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Your continued use of Metll after changes become effective constitutes acceptance of the updated policy.
                        </p>
                    </section>


                    {/* Section 10 - Contact Information */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            10. Contact Information
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
                        </p>

                        <div className="bg-gray-50 p-6 rounded-lg mb-4">
                            <p className="text-base md:text-lg text-[#311717]/90 mb-2">
                                <strong>Email:</strong> support@metll.in
                            </p>
                            <p className="text-base md:text-lg text-[#311717]/90 mb-2">
                                <strong>Business Address:</strong> Bellandur, Bengaluru, Karnataka, India
                            </p>
                        </div>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            Grievance Officer
                        </h3>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            In accordance with the Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
                        </p>

                        <div className="bg-gray-50 p-6 rounded-lg mb-4">
                            <p className="text-base md:text-lg text-[#311717]/90 mb-2">
                                <strong>Name:</strong> Sankalp Dixit
                            </p>
                            <p className="text-base md:text-lg text-[#311717]/90 mb-2">
                                <strong>Email:</strong> support@metll.in
                            </p>
                        </div>
                    </section>


                    {/* Acknowledgment */}
                    <section className="mb-16 md:mb-20">
                        <div className="mt-8 pt-6 border-t border-[#311717]/20">
                            <p className="text-sm md:text-base text-[#311717]/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                <strong>Effective Date:</strong> February 2, 2026<br />
                                <strong>Last Updated:</strong> February 2, 2026<br />
                                <strong>Version:</strong> 2.0
                            </p>
                            <p className="text-sm md:text-base text-[#311717]/70 mt-4 italic">
                                This Privacy Policy is designed to comply with Google Play Store requirements, Information Technology Act 2000 (India), and international privacy standards.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative bg-[#5A6FA3] overflow-hidden min-h-[500px] md:min-h-[700px] lg:min-h-[800px] mt-20">
                {/* Large MetLL Text as Background */}
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

                {/* Progressive blur overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 80%)',
                }} />

                {/* Content Layer */}
                <div className="relative z-10">
                    <div className="pt-20 md:pt-28 pb-16 md:pb-20 px-6 md:px-12 lg:px-16">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                            {/* Brand Column */}
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
                                    © 2026 MetLL. All rights reserved.
                                </p>
                            </div>

                            {/* Links */}
                            <div className="flex gap-10 sm:gap-16 md:gap-20">
                                <div>
                                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
                                    <ul className="space-y-3">
                                        <li><Link to="/about" className="text-white/70 hover:text-white transition-colors text-sm">About us</Link></li>
                                        <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy</Link></li>
                                        <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact</Link></li>
                                    </ul>
                                </div>

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
