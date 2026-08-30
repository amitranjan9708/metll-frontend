import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [authMode, setAuthMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const MASCOT_VIDEO_URL = "/mascot_welcome.webm";

  const handleSendOTP = async () => {
    setErrorMsg("");
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    if (authMode === "SIGNUP" && !/^[6-9]\d{9}$/.test(phoneNumber)) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.sendOtp(
        email.trim().toLowerCase(),
        authMode === "SIGNUP" ? phoneNumber : undefined,
        authMode === "SIGNUP" ? referralCode.trim() || undefined : undefined,
        authMode === "LOGIN" ? "login" : "signup"
      );

      if (!response.success) {
        setErrorMsg(response.message || "Failed to send OTP");
        return;
      }
      
      // Navigate to OTP
      navigate("/otp", { state: { user: { email: email.trim().toLowerCase() } } });
    } catch (error: any) {
      if (error.message && error.message.includes("not registered")) {
        // User not registered prompt
        if (window.confirm("It looks like you are not registered yet. Would you like to sign up?")) {
          setAuthMode("SIGNUP");
        }
      } else {
        setErrorMsg(error.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast({ title: "Error", description: "Google Sign-In failed to return credentials.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.googleLogin(
        credentialResponse.credential,
        authMode === "SIGNUP" ? referralCode.trim() || undefined : undefined,
        authMode === "LOGIN" ? "login" : "signup"
      );

      if (!response.success || !response.data) {
        throw new Error(response.message || "Google Login failed");
      }

      const backendUser = response.data.user as any;
      const hasCompletedOnboarding = !!backendUser.isOnboarded;

      const userData = {
        id: backendUser.id?.toString() || "",
        name: backendUser.name || "",
        email: backendUser.email || "",
        phone: backendUser.phone || backendUser.phoneNumber || "",
        photo: backendUser.photo,
        isOnboarded: hasCompletedOnboarding,
        createdAt: backendUser.createdAt || new Date().toISOString(),
      };

      await login(userData, response.data.token);
      navigate(hasCompletedOnboarding ? "/home" : "/onboarding");
    } catch (error: any) {
      if (error.message && error.message.includes("not registered")) {
        if (window.confirm("It looks like you are not registered yet. Would you like to sign up?")) {
          setAuthMode("SIGNUP");
        }
      } else {
        toast({ title: "Error", description: error.message || "Google Sign-In failed.", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast({ title: "Error", description: "Google Sign-In failed.", variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-safe pb-safe overflow-hidden">
      <div className="flex-1 w-full max-w-md mx-auto px-6 py-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex-1 flex flex-col"
        >
          {/* Brand Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-[32px] font-['Novaklasse'] text-[#1A1A1A] tracking-[1px] leading-none m-0">metll</h1>
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-[5px]" />
          </div>

          {/* Hero Section */}
          <div className="flex flex-col items-center mb-8">
            <video 
              src={MASCOT_VIDEO_URL} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-[180px] h-[180px] object-cover pointer-events-none mb-3"
            />
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1 text-center">Welcome to Metll</h2>
            <p className="text-[13px] text-[#6B6B6B] text-center leading-tight px-4">
              Join thousands finding meaningful connections
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 mb-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[#333333] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>

            {authMode === "SIGNUP" && (
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Mobile Number</label>
                    <div className="flex items-center w-full h-12 rounded-xl border border-[#333333] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      <div className="pl-4 pr-3 text-[#333] font-medium border-r border-gray-200">+91</div>
                      <input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 h-full px-3 text-gray-900 focus:outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Referral Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter invite code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-[#333333] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all uppercase placeholder:text-gray-400"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full h-12 bg-[#1F1F1F] text-white rounded-full font-bold text-base mt-2 shadow-sm hover:bg-[#2D2D2D] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                authMode === "LOGIN" ? "Log In with Email" : "Sign Up with Email"
              )}
            </button>

            {errorMsg && (
              <p className="text-[#E53e3e] text-[13px] text-center font-medium">{errorMsg}</p>
            )}

            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-[#E0E0E0]" />
              <span className="px-4 text-[#9B9B9B] text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>

            <div className="relative w-full h-[48px] rounded-lg overflow-hidden">
              <button
                className="absolute inset-0 w-full h-[48px] bg-white border border-[#E0E0E0] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex flex-row items-center justify-center gap-3 pointer-events-none"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-[16px] text-[#333] font-semibold">Sign in with Google</span>
              </button>
              <div className="absolute inset-0 z-10 w-full h-full" style={{ opacity: 0.0001 }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="rectangular"
                  width="400"
                />
              </div>
            </div>

            <button
              onClick={() => { setAuthMode(authMode === "LOGIN" ? "SIGNUP" : "LOGIN"); setErrorMsg(""); }}
              className="mt-2 text-center text-[#007AFF] text-[15px] font-medium hover:underline"
            >
              {authMode === "LOGIN" ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>

          <div className="flex-1" />

          {/* Footer */}
          <p className="text-[13px] text-[#9B9B9B] text-center leading-tight px-4 mt-8 pb-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#A4B8E7] underline font-medium">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[#A4B8E7] underline font-medium">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
