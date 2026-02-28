import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Deletion() {
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
                    Account &amp; Data Deletion Policy
                </h1>

                <div className="mb-8 text-[#311717]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <p className="text-sm md:text-base mb-2">
                        <strong>Last Updated:</strong> February 28, 2026
                    </p>
                    <p className="text-sm md:text-base">
                        <strong>Effective Date:</strong> February 28, 2026
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
                            At Metll, we respect your right to control your personal data. This Account &amp; Data Deletion Policy explains how you can request the deletion of your account and associated data, what data is deleted, what may be retained, and the timelines involved.
                        </p>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed">
                            This policy is provided in compliance with Google Play Store requirements and applicable data protection regulations. If you wish to delete your Metll account and the personal data associated with it, please follow the steps outlined below.
                        </p>
                    </section>


                    {/* Section 1 - How to Request Account Deletion */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1. How to Request Account Deletion
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            You can request account and data deletion through any of the following methods:
                        </p>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1.1 In-App Deletion
                        </h3>
                        <ol className="list-decimal list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Open the Metll app and go to your <strong>Profile</strong></li>
                            <li>Navigate to <strong>Settings</strong></li>
                            <li>Tap on <strong>Delete Account</strong></li>
                            <li>Confirm your decision when prompted</li>
                        </ol>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Your account will be scheduled for permanent deletion immediately upon confirmation.
                        </p>

                        <h3
                            className="text-xl md:text-2xl font-semibold text-[#311717] mb-3 mt-6"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            1.2 Via Email
                        </h3>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            If you are unable to access the app, you can request account deletion by sending an email to:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg mb-4">
                            <p className="text-base md:text-lg text-[#311717]/90 mb-2">
                                <strong>Email:</strong> support@metll.in
                            </p>
                            <p className="text-base md:text-lg text-[#311717]/90">
                                <strong>Subject:</strong> Account Deletion Request
                            </p>
                        </div>
                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Please include the phone number or email address associated with your Metll account so we can verify your identity and process the request.
                        </p>
                    </section>


                    {/* Section 2 - Data That Will Be Deleted */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            2. Data That Will Be Deleted
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            When your account deletion is processed, the following data will be permanently deleted:
                        </p>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Account &amp; Profile Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Name, phone number, and email address</li>
                            <li>Bio, age, date of birth, gender identity, and height</li>
                            <li>Profile photos and all uploaded media</li>
                            <li>Verification selfie/video data</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Background Information:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Current and past city information</li>
                            <li>School, college, and workplace details</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Dating &amp; Preference Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Relationship type and dating intention preferences</li>
                            <li>Gender, age range, and distance preferences</li>
                            <li>Lifestyle preferences (children, family plans, smoking, drinking, etc.)</li>
                            <li>Answers to personality prompts and situational questions</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Communication &amp; Social Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>All text messages, voice notes, and audio messages</li>
                            <li>Images, videos, and GIFs shared in chats</li>
                            <li>Match history, swipe history, and likes</li>
                            <li>Stories and associated media</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Confession Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>All confessions created by you</li>
                            <li>Crush details and proximity-based descriptions</li>
                        </ul>

                        <p className="text-base md:text-lg font-semibold text-[#311717]/90 mb-2">
                            <strong>Device &amp; Usage Data:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Push notification tokens and device identifiers</li>
                            <li>Location data</li>
                            <li>Usage logs and interaction history</li>
                        </ul>
                    </section>


                    {/* Section 3 - Data That May Be Retained */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            3. Data That May Be Retained
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            In certain limited circumstances, we may retain specific data even after account deletion, as required by law or for legitimate safety purposes:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Legal Compliance:</strong> Data required to comply with legal obligations, court orders, or regulatory requirements may be retained for the legally mandated period</li>
                            <li><strong>Fraud Prevention:</strong> Limited identifiers may be retained to prevent banned users from creating new accounts and to protect the safety of our community</li>
                            <li><strong>Transaction Records:</strong> Records of any financial transactions (e.g., premium subscriptions, coffee date ticket purchases) may be retained for accounting and tax compliance purposes</li>
                            <li><strong>Aggregated &amp; Anonymized Data:</strong> Fully anonymized and aggregated statistical data that cannot be used to identify you may be retained for analytics and service improvement</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Retained data is stored securely and is only accessed when strictly necessary for the stated purposes.
                        </p>
                    </section>


                    {/* Section 4 - Deletion Timeline */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            4. Deletion Timeline
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Upon receiving a valid account deletion request:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Immediate:</strong> Your profile is removed from visibility to other users and you are logged out of all sessions</li>
                            <li><strong>Within 7 days:</strong> Your account is deactivated and all active matches, conversations, and confessions are terminated</li>
                            <li><strong>Within 30 days:</strong> All personal data (as described in Section 2) is permanently and irreversibly deleted from our servers and third-party storage providers (Cloudinary, AWS, etc.)</li>
                        </ul>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            <strong>Note:</strong> Once the 30-day deletion period is complete, your data cannot be recovered. If you wish to use Metll again, you will need to create a new account.
                        </p>
                    </section>


                    {/* Section 5 - Third-Party Data Deletion */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            5. Third-Party Data Deletion
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            When your account is deleted, we also initiate deletion of your data from the following third-party services used by Metll:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Cloudinary:</strong> All photos, videos, and media files associated with your account are deleted</li>
                            <li><strong>AWS Rekognition:</strong> Face verification data is not permanently stored; any temporary processing data is purged</li>
                            <li><strong>Firebase/FCM:</strong> Push notification tokens associated with your device are invalidated</li>
                            <li><strong>Agora:</strong> Voice and video call session data is cleared</li>
                        </ul>
                    </section>


                    {/* Section 6 - Impact of Account Deletion */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            6. Impact of Account Deletion
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            Please be aware that deleting your account will result in the following:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li>Permanent loss of all matches, conversations, and connections</li>
                            <li>Permanent loss of all confessions (both sent and received)</li>
                            <li>Forfeiture of any unused coffee date tickets or referral rewards</li>
                            <li>Loss of any premium subscription benefits (no refunds for unused subscription periods)</li>
                            <li>Your profile will no longer appear in other users' feeds, match lists, or confession results</li>
                            <li>Messages you sent to other users may still appear in their chat history as &quot;Deleted User&quot;</li>
                        </ul>
                    </section>


                    {/* Section 7 - Cancellation of Deletion Request */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            7. Cancellation of Deletion Request
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            If you change your mind after submitting a deletion request:
                        </p>

                        <ul className="list-disc list-inside mb-4 space-y-4 text-base md:text-lg text-[#311717]/90 leading-relaxed ml-4">
                            <li><strong>Within 7 days:</strong> You may cancel the deletion by logging back into the app or contacting support at <strong>support@metll.in</strong></li>
                            <li><strong>After 7 days:</strong> The deletion process becomes irreversible and cannot be cancelled</li>
                        </ul>
                    </section>


                    {/* Section 8 - Contact Information */}
                    <section className="mb-16 md:mb-20">
                        <h2
                            className="text-2xl md:text-3xl font-semibold text-[#311717] mb-4 mt-8"
                            style={{ fontFamily: "'Novaklasse', sans-serif" }}
                        >
                            8. Contact Information
                        </h2>

                        <p className="text-base md:text-lg text-[#311717]/90 leading-relaxed mb-4">
                            If you have questions about this policy or need assistance with account deletion, please contact us:
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
                                <strong>Effective Date:</strong> February 28, 2026<br />
                                <strong>Last Updated:</strong> February 28, 2026<br />
                                <strong>Version:</strong> 1.0
                            </p>
                            <p className="text-sm md:text-base text-[#311717]/70 mt-4 italic">
                                This Account &amp; Data Deletion Policy is designed to comply with Google Play Store data deletion requirements, Information Technology Act 2000 (India), and international data protection standards.
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
