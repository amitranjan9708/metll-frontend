import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { swipeApi } from "../lib/swipeApi";
import { MessageCircle, Heart, ChevronRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Matches() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"matches" | "likes">("matches");
  const [matches, setMatches] = useState<any[]>([]);
  const [likers, setLikers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [m, l] = await Promise.all([
        swipeApi.getMatches(),
        swipeApi.getWhoLikedMe()
      ]);
      setMatches(m as any[]);
      setLikers(l as any[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchClick = (name: string) => {
    toast({
      title: "Chat Coming Soon",
      description: `Messaging with ${name} will be available in the next update!`,
    });
  };

  const handleLikeBack = async (id: string, name: string) => {
    toast({ title: "It's a Match! 🎉", description: `You and ${name} like each other!` });
    setLikers(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 pb-24">


      {/* Tabs */}
      <div className="flex px-6 gap-2 mb-6">
        <button 
          onClick={() => setActiveTab("matches")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all ${
            activeTab === "matches" ? "bg-primary text-white shadow-md" : "bg-white text-gray-500 border border-gray-200"
          }`}
        >
          <MessageCircle className="w-4 h-4" /> Matches
        </button>
        <button 
          onClick={() => setActiveTab("likes")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all relative ${
            activeTab === "likes" ? "bg-primary text-white shadow-md" : "bg-white text-gray-500 border border-gray-200"
          }`}
        >
          <Heart className="w-4 h-4" /> Likes
          {!loading && likers.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {likers.length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : activeTab === "matches" ? (
          <div className="space-y-3">
            {matches.length === 0 ? (
              <EmptyState type="matches" />
            ) : (
              <AnimatePresence>
                {matches.map((match) => (
                  <motion.div 
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleMatchClick(match.matchedUser.name)}
                    className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98] transition-all"
                  >
                    <div className="relative">
                      <img src={match.matchedUser.profilePhoto} className="w-14 h-14 rounded-full object-cover bg-gray-100" alt="" />
                      {match.lastMessage === null && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-rose-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <h3 className="font-bold text-gray-900 text-lg">{match.matchedUser.name}</h3>
                        {match.matchedUser.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className={`text-sm line-clamp-1 ${match.lastMessage ? 'text-gray-500' : 'text-primary font-medium'}`}>
                        {match.lastMessage ? match.lastMessage.content : "New match! Say hello 👋"}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {likers.length === 0 ? (
              <div className="col-span-2">
                <EmptyState type="likes" />
              </div>
            ) : (
              <AnimatePresence>
                {likers.map((liker) => (
                  <motion.div
                    key={liker.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group"
                  >
                    <img src={liker.profilePhoto} className="w-full aspect-[4/5] object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold">{liker.name}, {liker.age}</h3>
                      <p className="text-xs text-gray-300 mb-3">Recently</p>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setLikers(prev => prev.filter(l => l.id !== liker.id))}
                          className="flex-1 bg-white/20 backdrop-blur-sm py-2 rounded-xl flex justify-center hover:bg-white/30"
                        >
                          <span className="text-xs font-bold uppercase">Pass</span>
                        </button>
                        <button 
                          onClick={() => handleLikeBack(liker.id, liker.name)}
                          className="flex-1 bg-primary py-2 rounded-xl flex justify-center hover:bg-primary/90"
                        >
                          <span className="text-xs font-bold uppercase">Like Back</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

function EmptyState({ type }: { type: "matches" | "likes" }) {
  const navigate = useNavigate();

  if (type === "likes") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <img 
          src="/mascot/mascot_no_likes.png" 
          alt="No likes" 
          className="w-48 h-48 object-contain mb-6 drop-shadow-md"
        />
        <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">
          No likes yet
        </h3>
        <p className="text-[15px] text-gray-500 max-w-[280px] leading-relaxed">
          When someone likes your profile, they'll appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <img 
        src="/mascot/mascot_no_matches.png" 
        alt="No matches" 
        className="w-48 h-48 object-contain mb-6 drop-shadow-md"
      />
      <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">
        No matches yet
      </h3>
      <p className="text-[15px] text-gray-500 max-w-[280px] leading-relaxed mb-8">
        Take it easy! Start swiping to find people you vibe with.
      </p>
      <button 
        onClick={() => navigate('/date')}
        className="bg-primary text-white font-bold text-[15px] px-8 py-3.5 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        Find Matches
      </button>
    </div>
  );
}
