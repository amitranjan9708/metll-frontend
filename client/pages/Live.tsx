import React from "react";
import { motion } from "framer-motion";
import { Rocket, Navigation, Users, Heart } from "lucide-react";

export default function Live() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute top-[-150px] right-[-100px] w-[350px] h-[350px] bg-gray-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-100px] w-[280px] h-[280px] bg-gray-200/50 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Rings */}
      <div className="relative w-[260px] h-[260px] flex items-center justify-center mb-12">
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[260px] h-[260px] rounded-full border-[1.5px] border-gray-900"
        />
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute w-[200px] h-[200px] rounded-full border-[1.5px] border-gray-900"
        />
        <motion.div
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute w-[140px] h-[140px] rounded-full border-[1.5px] border-gray-900"
        />

        {/* Center Icon */}
        <motion.div
          animate={{ y: [-12, 0, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[88px] h-[88px] bg-white rounded-full flex items-center justify-center border-2 border-gray-900 shadow-xl"
        >
          <Rocket className="w-11 h-11 text-gray-900" />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center max-w-sm z-10">
        <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Coming Soon</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Discover Nearby
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Find and connect with people around you in real-time. This exciting feature is under development.
        </p>

        {/* Feature Preview */}
        <div className="w-full space-y-3">
          <FeatureItem icon={<Navigation className="w-5 h-5"/>} text="Real-time location tracking" />
          <FeatureItem icon={<Users className="w-5 h-5"/>} text="See who's around you" />
          <FeatureItem icon={<Heart className="w-5 h-5"/>} text="Send anonymous confessions" />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center bg-white px-4 py-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 mr-3">
        {icon}
      </div>
      <span className="flex-1 text-left text-[15px] font-semibold text-gray-900">{text}</span>
    </div>
  );
}
