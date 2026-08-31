import React from "react";
import { Heart, Sparkles } from "lucide-react";

export default function DateFeed() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">

      <div className="flex-1 px-4 flex flex-col items-center justify-center -mt-10">
        <div className="w-full max-w-sm relative">
          {/* Decorative background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-[#A4B8E7] rounded-full blur-[80px] opacity-40 pointer-events-none" />

          <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-[#A4B8E7]/20 relative z-10 flex flex-col items-center text-center overflow-hidden">
            {/* Top Badge */}
            <div className="bg-gradient-to-r from-[#A4B8E7] to-[#7A96D4] text-white px-4 py-1.5 rounded-full mb-8 shadow-md">
              <span className="text-[11px] font-[800] tracking-[1.5px] uppercase flex items-center gap-1.5">
                <Sparkles size={12} /> App Exclusive
              </span>
            </div>

            {/* Icon */}
            <div className="w-24 h-24 bg-[#F4F7FF] rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg relative">
              <div className="absolute inset-0 bg-[#A4B8E7] rounded-full animate-ping opacity-20" />
              <Heart className="w-10 h-10 text-[#7A96D4]" fill="#7A96D4" />
            </div>

            {/* Content */}
            <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'serif' }}>
              Dating Mode
            </h2>
            <p className="text-[15px] text-[#5A5A6A] leading-relaxed mb-8 px-2">
              Swipe, match, and spark meaningful connections. The full dating experience is waiting for you!
            </p>

            {/* Availability Badges */}
            <div className="w-full flex flex-col gap-3">
              <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
                  <span className="text-[14px] font-bold text-[#2E7D32]">Live for Android</span>
                </div>
              </div>

              <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-2xl p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-[#9E9E9E] rounded-full" />
                <span className="text-[14px] font-bold text-[#757575]">Coming soon on App Store</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
