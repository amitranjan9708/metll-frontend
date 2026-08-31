import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Deletion from "./pages/Deletion";
import SafetyStandards from "./pages/SafetyStandards";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import PhotoUpload from "./pages/PhotoUpload";
import Confession from "./pages/Confession";
import BlogListing from "./pages/BlogListing";
import BlogPost from "./pages/BlogPost";
import { PlatformGate } from "./components/PlatformGate";
import { BrowserGate } from "./components/BrowserGate";
import { AuthProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MainLayout } from "./components/MainLayout";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import Situations from "./pages/Situations";
import DateFeed from "./pages/Date";
import Live from "./pages/Live";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Dates from "./pages/Dates";
import EditProfile from "./pages/EditProfile";
import PrivacySecurity from "./pages/PrivacySecurity";
import HelpCenter from "./pages/HelpCenter";
import Referral from "./pages/Referral";
import Ambassador from "./pages/Ambassador";
import MyConfessions from "./pages/MyConfessions";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = "557642332261-s9v6dr4jsus02c73mu5qk32204fg0g1j.apps.googleusercontent.com";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <BrowserGate>
              <AuthProvider>
                <Toaster />
                <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route path="/register" element={<Register />} />
                  <Route path="/otp" element={<OTP />} />
                  
                  {/* Marketing Pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/deletion" element={<Deletion />} />
                  <Route path="/safety-standards" element={<SafetyStandards />} />
                  <Route path="/blog" element={<BlogListing />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  
                  <Route element={<MainLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/live" element={<Live />} />
                    <Route path="/date" element={<DateFeed />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/photo-upload" element={<PhotoUpload />} />
                  <Route path="/situations" element={<Situations />} />
                  <Route path="/confess" element={<Confession />} />
                  <Route path="/referral" element={<Referral />} />
                  <Route path="/ambassador" element={<Ambassador />} />
                  <Route path="/my-confessions" element={<MyConfessions />} />
                  <Route path="/dates" element={<Dates />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/privacy-security" element={<PrivacySecurity />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/chat/:matchId" element={<Chat />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              </AuthProvider>
            </BrowserGate>
        </GoogleOAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
