import React, { useEffect, useState } from 'react';
import { Crown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTimeRemaining, pad, isProgramActive, getUrgencyLevel } from '../lib/ambassadorUtils';
import { configApi } from '../lib/configApi';
import { AppConfigKey } from '../lib/configApi';

interface AmbassadorBannerProps {
  onPress: () => void;
}

export const AmbassadorBanner: React.FC<AmbassadorBannerProps> = ({ onPress }) => {
  const [time, setTime] = useState(getTimeRemaining());
  const [isConfigEnabled, setIsConfigEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    configApi.getConfigs().then(res => {
      if (res.success && res.data[AppConfigKey.SHOW_EARLY_AMBASSADOR_CTA] === 'true') {
        setIsConfigEnabled(true);
      }
    }).catch(console.error);
  }, []);

  if (!isProgramActive() || !time || !isConfigEnabled) return null;

  const urgency = getUrgencyLevel();
  const isCritical = urgency === 'critical';
  const isHigh = urgency === 'high';

  const accentColor = isCritical ? 'text-[#D64545]' : isHigh ? 'text-[#E07A5F]' : 'text-[#A4B8E7]';
  const glowColorHex = isCritical ? '#FFBDBD' : isHigh ? '#FFD4C4' : '#D1DEFA';
  const glowColorClass = isCritical ? 'shadow-[#FFBDBD]' : isHigh ? 'shadow-[#FFD4C4]' : 'shadow-[#D1DEFA]';

  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      className={`mx-4 mb-5 mt-2 rounded-[20px] shadow-lg ${glowColorClass}`}
    >
      <button
        onClick={onPress}
        className="w-full text-left rounded-[20px] overflow-hidden border-[1.5px] border-white/80 relative active:scale-[0.98] transition-transform"
      >
        <div className="bg-white p-4 relative h-full w-full">
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40" 
            style={{ background: `linear-gradient(to bottom right, ${glowColorHex}, transparent)` }}
          />

          <div className="flex flex-row items-center justify-between relative z-10">
            <div className="flex flex-row items-center flex-1 gap-3">
              {/* Static Glow Flare */}
              <div
                className="absolute -left-[30px] -top-[30px] w-[100px] h-[100px] rounded-full opacity-20 bg-[#9B9B9B] blur-xl"
              />

              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <Crown size={32} className={accentColor} />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-[11px] text-[#1A1A1A] tracking-[1.2px] uppercase">
                  Early Ambassador
                </h3>
                <p className="text-[12px] text-[#6B6B6B] mt-0.5 font-medium">
                  Invite your crush before it's paid
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center bg-white/70 px-2.5 py-1.5 rounded-xl">
                <span className={`font-bold text-base ${accentColor}`}>{pad(time.days)}</span>
                <span className="font-bold text-[14px] text-[#9B9B9B] mx-1 -mt-0.5">:</span>
                <span className={`font-bold text-base ${accentColor}`}>{pad(time.hours)}</span>
                <span className="font-bold text-[14px] text-[#9B9B9B] mx-1 -mt-0.5">:</span>
                <span className={`font-bold text-base ${accentColor}`}>{pad(time.minutes)}</span>
              </div>
              <ChevronRight size={16} className={`ml-1.5 ${accentColor}`} />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};
