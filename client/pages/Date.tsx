import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { swipeApi } from "../lib/swipeApi";
import { X, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react";

export default function DateFeed() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(true);
    const data: any = await swipeApi.getProfiles();
    setProfiles(data);
    setLoading(false);
  };

  const removeTopCard = (direction: "like" | "pass", id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    swipeApi.swipe(id, direction);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Finding people near you...</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pb-24">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">👻</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You've caught up!</h2>
        <p className="text-gray-500 text-center max-w-xs">
          You've seen everyone in your area. Come back later for new faces.
        </p>
        <button onClick={loadProfiles} className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-sm active:scale-95 transition-transform">
          Refresh List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center overflow-hidden pb-24 pt-8">
      <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center">
        <AnimatePresence>
          {profiles.map((profile, index) => {
            // Only render the top 2 cards for performance
            if (index > 1) return null;
            const isTop = index === 0;

            return (
              <SwipeCard 
                key={profile.id} 
                profile={profile} 
                isTop={isTop} 
                onSwipe={(direction) => removeTopCard(direction, profile.id)} 
              />
            );
          }).reverse()}
        </AnimatePresence>
      </div>
      
      {/* Bottom Action Buttons (for tap rather than swipe) */}
      <div className="flex gap-6 mt-8">
        <button 
          onClick={() => removeTopCard("pass", profiles[0].id)}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-rose-500 hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-8 h-8" />
        </button>
        <button 
          onClick={() => removeTopCard("like", profiles[0].id)}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-emerald-500 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all"
        >
          <Heart className="w-7 h-7 fill-current" />
        </button>
      </div>
    </div>
  );
}

function SwipeCard({ profile, isTop, onSwipe }: { profile: any, isTop: boolean, onSwipe: (dir: "like"|"pass") => void }) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Transform values based on drag distance
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Like/Pass indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      // Swiped Right
      controls.start({ x: 300, opacity: 0, transition: { duration: 0.3 } }).then(() => onSwipe("like"));
    } else if (info.offset.x < -threshold) {
      // Swiped Left
      controls.start({ x: -300, opacity: 0, transition: { duration: 0.3 } }).then(() => onSwipe("pass"));
    } else {
      // Return to center
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
      style={{ x, rotate, opacity: isTop ? 1 : 0.9, scale: isTop ? 1 : 0.95, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    >
      {/* Photo */}
      <div className="relative w-full h-[70%]">
        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Swipe Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-emerald-500 text-emerald-500 font-bold text-3xl px-4 py-1 rounded-lg transform -rotate-12 pointer-events-none">
          LIKE
        </motion.div>
        <motion.div style={{ opacity: passOpacity }} className="absolute top-8 right-8 border-4 border-rose-500 text-rose-500 font-bold text-3xl px-4 py-1 rounded-lg transform rotate-12 pointer-events-none">
          NOPE
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 h-[30%] bg-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-none mb-2">
            {profile.name}, {profile.age}
          </h2>
          
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"><MapPin className="w-3 h-3"/> {profile.distance} km away</span>
            {profile.school && <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"><GraduationCap className="w-3 h-3"/> {profile.school.name}</span>}
            {profile.office && <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"><Briefcase className="w-3 h-3"/> {profile.office.name}</span>}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          "{profile.bio}"
        </p>
      </div>
    </motion.div>
  );
}
