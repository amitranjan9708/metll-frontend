import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ArrowLeft, X, ChevronRight, User, Instagram, Twitter, Facebook } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCustomAlert } from "../components/CustomAlert";
import { AmbassadorBanner } from "../components/AmbassadorBanner";
import { StoryRing } from "../components/StoryRing";

type ConfessionType = 'school' | 'college' | 'office' | 'home' | 'social';

const CONFESSION_CARDS = [
  {
    type: 'school' as const,
    title: 'School',
    subtitle: 'Classmate crushes',
    position: 'left',
    gradientColor: '#A4B8E7',
  },
  {
    type: 'college' as const,
    title: 'College',
    subtitle: 'Campus connections',
    position: 'right',
    gradientColor: '#FFFFFF',
  },
  {
    type: 'office' as const,
    title: 'Office',
    subtitle: 'Workplace sparks',
    position: 'left',
    gradientColor: '#A4B8E7',
  },
  {
    type: 'home' as const,
    title: 'Nearby',
    subtitle: 'Local connections',
    position: 'right',
    gradientColor: '#FFFFFF',
  },
  {
    type: 'social' as const,
    title: 'Social Handle',
    subtitle: 'Match via Username',
    position: 'left',
    gradientColor: '#FFD1DC',
  },
];

const mockMatchingUsers = [
  { id: '1', name: 'Alex', matchScore: 95 },
  { id: '2', name: 'Sam', matchScore: 88 },
  { id: '3', name: 'Jordan', matchScore: 82 },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  


  const { showAlert, AlertComponent } = useCustomAlert();

  const handleConfessionTypeSelect = (type: ConfessionType) => {
    if (type === 'home') {
      showAlert(
        'Coming Soon! ',
        'Local connections is under development. Stay tuned for exciting updates!',
        [{ text: 'OK' }],
        'coming_soon'
      );
    } else if (type === 'social') {
      // Mock navigation
      showAlert('Coming Soon!', 'Social Confession is coming soon!');
    } else {
      navigate('/confess', { state: { initialTab: type } });
    }
  };

  const getMascotForType = (type: string) => {
    switch (type) {
      case 'school': return '/mascot/mascot_school.png';
      case 'college': return '/mascot/mascot_college.png';
      case 'office': return '/mascot/mascot_office.png';
      case 'home': return '/mascot/mascot_nearby.png';
      default: return '/mascot/mascot_college.png';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">
      <AlertComponent />

      {/* Premium Header */}
      <div className="px-6 pt-10 pb-4">
        <div className="flex flex-row items-center justify-between mb-1">
          <h1 className="text-[32px] text-[#2A2A2A] leading-none" style={{ fontFamily: 'Novaklasse, sans-serif', letterSpacing: '1px' }}>metll</h1>

          <div className="flex flex-row items-center gap-3">
            <button className="flex items-center bg-[#F5F5F5] px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
              <motion.img 
                src="/mascot/mascot_magnet.png" 
                alt="magnet" 
                className="w-6 h-6"
                animate={{ rotate: [-10, 0, 10, 0, -10] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <span className="ml-1 font-bold text-[14px] text-[#1A1A1A]">{user?.magnetCoins || 0}</span>
            </button>
            <StoryRing profilePhoto={user?.photo} size={40} />
          </div>
        </div>
        <p className="text-[15px] text-[#6B6B6B]">Make an anonymous confession</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AmbassadorBanner onPress={() => {}} />

        {/* Poster Banner */}
        <div className="px-4 mb-8">
          <div className="w-full rounded-2xl overflow-hidden shadow-md">
            <img src="/confession_poster.png" alt="Confession Poster" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Section Separator */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[1.5px]">Choose your confession</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        {/* Cards Grid */}
        <div className="px-4 flex flex-col gap-4">
          {CONFESSION_CARDS.map((card, index) => {
            const hasBackgroundImage = card.type === 'school' || card.type === 'office';
            const isSocial = card.type === 'social';

            if (isSocial) {
              return (
                <button
                  key={card.type}
                  onClick={() => handleConfessionTypeSelect(card.type)}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5 relative text-left active:scale-[0.98] transition-transform"
                >
                  <div className="absolute -top-10 -left-10 w-[140px] h-[140px] rounded-full bg-[#A4B8E7] opacity-15 blur-2xl" />
                  
                  <div className="absolute -bottom-10 -right-10 w-[190px] h-[190px] rounded-full overflow-hidden shadow-xl">
                    <img src="/social-match-art.png" alt="Social Match" className="w-full h-full object-cover" />
                  </div>

                  <div className="relative z-10 p-5 flex flex-row items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-1">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mr-2">Social Match</h3>
                      </div>
                      <p className="text-[13px] text-[#6B6B6B] leading-[18px]">
                        Confess directly to their Instagram, X or Facebook username.
                      </p>
                      
                      <div className="flex mt-3.5">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#F4F7FF] flex items-center justify-center shadow-sm z-30"><Instagram size={16} color="#E1306C" /></div>
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#F4F7FF] flex items-center justify-center shadow-sm -ml-3 z-20"><Twitter size={16} color="#1DA1F2" /></div>
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-[#F4F7FF] flex items-center justify-center shadow-sm -ml-3 z-10"><Facebook size={16} color="#1877F2" /></div>
                      </div>
                    </div>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#A4B8E7]/15 flex items-center justify-center">
                      <Search size={24} className="text-[#A4B8E7]" />
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <button
                key={card.type}
                onClick={() => handleConfessionTypeSelect(card.type)}
                className={`w-full rounded-2xl relative overflow-hidden active:scale-[0.98] transition-transform text-left ${hasBackgroundImage ? '' : index % 2 === 0 ? 'bg-[#A4B8E7]' : 'bg-white border border-black/5'}`}
              >
                {hasBackgroundImage && (
                  <img src="/32905340_j.png" className="absolute inset-0 w-full h-full object-cover" alt="bg" />
                )}
                
                <div className={`relative z-10 flex items-center py-2 px-3 ${card.position === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Character Image */}
                  <div className="w-[100px] h-[100px] flex justify-center items-center shrink-0">
                    <img src={getMascotForType(card.type)} className="w-[100px] h-[100px] object-contain" alt="mascot" />
                  </div>
                  
                  {/* Text Content with Decorative Lines */}
                  <div className="flex-1 flex flex-col justify-center px-2 h-[80px]">
                    {/* Top Line */}
                    <div className="flex flex-row items-center h-[1.5px] w-full">
                      <div className="w-6 h-[1.5px] bg-[#1A1A1A] opacity-10 rounded-[1px]" />
                      <div className="flex-1 h-[1.5px] bg-[#1A1A1A] opacity-20 mx-[2px] rounded-[1px]" />
                      <div className="w-6 h-[1.5px] bg-[#1A1A1A] opacity-10 rounded-[1px]" />
                    </div>

                    <div className="py-3 flex flex-col items-center justify-center">
                      <h3 className="text-[20px] font-bold text-[#1A1A1A] font-serif leading-tight">{card.title}</h3>
                      <p className="text-[14px] font-medium text-[#1A1A1A]/70 leading-tight">{card.subtitle}</p>
                    </div>

                    {/* Bottom Line */}
                    <div className="flex flex-row items-center h-[1.5px] w-full">
                      <div className="w-6 h-[1.5px] bg-[#1A1A1A] opacity-10 rounded-[1px]" />
                      <div className="flex-1 h-[1.5px] bg-[#1A1A1A] opacity-20 mx-[2px] rounded-[1px]" />
                      <div className="w-6 h-[1.5px] bg-[#1A1A1A] opacity-10 rounded-[1px]" />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="px-2 shrink-0 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasBackgroundImage ? 'bg-white/60' : (index % 2 === 0 ? 'bg-white/40' : 'bg-black/5')}`}>
                      {card.position === 'right' ? <ArrowLeft size={20} className="text-[#1A1A1A]" /> : <ArrowRight size={20} className="text-[#1A1A1A]" />}
                    </div>
                  </div>

                </div>
              </button>
            );
          })}
        </div>

        {/* Refer and Get Reward Card */}
        <div className="px-4 mt-6 mb-6">
          <button className="w-full text-left rounded-3xl overflow-hidden relative shadow-xl active:scale-[0.98] transition-transform border border-[#3F3F46]">
            <img src="/refer_couple_blue_bg.png" alt="Refer" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/60" />
            <div className="relative z-10 p-6 flex flex-row items-center">
              <div className="flex-1 pr-4">
                <div className="bg-[#A4B8E7]/15 border border-[#A4B8E7]/30 px-2.5 py-1 rounded-lg self-start inline-block mb-3">
                  <span className="text-[#A4B8E7] font-extrabold text-[10px] uppercase tracking-[1px]">VIP Rewards</span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-1">Invite Friends</h3>
                <p className="text-white/80 text-[14px] leading-tight">Get 500 magnet coins for every friend who joins.</p>
              </div>
              <div className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={24} className="text-[#1A1A1A]" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
