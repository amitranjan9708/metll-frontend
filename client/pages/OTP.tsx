import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../lib/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function OTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    setLoading(true);
    try {
      const response = await authApi.verifyOtp(user.email, code);
      if (!response.success || !response.data) {
        toast({ title: "Error", description: response.message || "Verification failed", variant: "destructive" });
        return;
      }
      
      const backendUser = response.data.user as any;
      const hasCompletedOnboarding = !!backendUser.isOnboarded;

      const userData = {
        id: backendUser.id?.toString() || "",
        name: backendUser.name || user.name || "",
        email: backendUser.email || user.email || "",
        phone: backendUser.phone || "",
        photo: backendUser.photo,
        isOnboarded: hasCompletedOnboarding,
        createdAt: backendUser.createdAt || new Date().toISOString(),
      };

      await login(userData, response.data.token);
      navigate(hasCompletedOnboarding ? "/home" : "/onboarding");
      
    } catch (error: any) {
      toast({ title: "Error", description: "Verification failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    try {
      await authApi.sendOtp(user.email);
      toast({ title: "Sent", description: "A new code has been sent to your email." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to resend code.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center px-6 pt-safe pb-safe">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="w-full max-w-md mx-auto bg-white rounded-[32px] px-6 py-12 border border-[#F0F0F0] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <img 
            src="https://raw.githubusercontent.com/indianguy123/metll-backend/main/metll-app-android/assets/mascot/mascot_thinking.png" 
            alt="Mascot" 
            className="w-[90px] h-[90px] object-contain mb-3"
          />
          <p className="text-[14px] text-[#A3A3A3] italic text-center mb-4 tracking-[0.5px]">
            "Every great romance starts with a simple hello."
          </p>
          <h1 className="text-[34px] font-[800] text-[#111111] tracking-[-1px] mb-4">
            Your story begins.
          </h1>
          <p className="text-[16px] text-[#737373] font-medium leading-[24px]">
            Enter the secret code we sent to<br/>
            <span className="text-[#111111] font-bold">{user?.email || "your email"}</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex gap-2 justify-center mb-12">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-14 text-center text-2xl font-bold bg-white border border-[#E0E0E0] rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full h-14 bg-primary text-white rounded-full font-bold text-lg mb-8 shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify"}
        </button>

        {/* Resend */}
        <div className="flex justify-center">
          {canResend ? (
            <button onClick={handleResend} className="text-[15px] text-[#111111] font-bold hover:underline">
              Resend code
            </button>
          ) : (
             <span className="text-[15px] text-[#737373] font-medium">
              Resend in <span className="text-[#111111] font-bold">{timer}s</span>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
