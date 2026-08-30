import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Sparkles, MessageCircle, Coffee, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { referralApi } from '../lib/referralApi';
import {
  getTimeRemaining,
  pad,
  isProgramActive,
  getUrgencyLevel,
  getShareMessage,
  TimeRemaining
} from '../lib/ambassadorUtils';

const FREE_PERKS = [
  {
    icon: MessageCircle,
    title: 'Free Confessions',
    description: 'Send confessions to crushes securely without any paywall',
    futurePrice: '₹99/mo',
  },
  {
    icon: Sparkles,
    title: 'Free Reveals',
    description: 'See who liked or confessed to you instantly',
    futurePrice: '₹149/mo',
  },
  {
    icon: Coffee,
    title: 'Free Coffee Dates',
    description: 'Every 10 referrals unlocks a completely free coffee date on us',
    futurePrice: '₹499/date',
  },
  {
    icon: Compass,
    title: 'Free Profile Boost',
    description: 'Appear higher in Discovery for better chances of matching',
    futurePrice: '₹199/mo',
  },
];

const CountBox = ({ value, label, accent }: { value: string, label: string, accent: string }) => (
    <div className="flex flex-col items-center">
        <div className={`bg-white border-2 rounded-xl px-2 py-2 min-w-[52px] flex items-center justify-center shadow-sm`} style={{ borderColor: `${accent}30` }}>
            <span className="text-[26px] font-bold tracking-tight" style={{ color: accent, fontFamily: 'Georgia, serif' }}>{value}</span>
        </div>
        <span className="text-[9px] font-semibold text-[#9B9B9B] tracking-[0.8px] mt-1">{label}</span>
    </div>
);

export default function Ambassador() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [time, setTime] = useState<TimeRemaining | null>(getTimeRemaining());
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadCode = async () => {
            try {
                const res = await referralApi.getStats();
                if (res.success && res.data?.stats) {
                    setReferralCode((res.data.stats as any).referralCode ?? '');
                }
            } catch (e) {
                console.error('Ambassador: referral load error', e);
            } finally {
                setLoading(false);
            }
        };
        loadCode();
    }, []);

    const handleShare = async () => {
        if (!referralCode || !time) return;
        const message = getShareMessage(referralCode, time.totalDays);
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Metll Ambassador',
                    text: message,
                });
            } catch (_) {}
        } else {
            await navigator.clipboard.writeText(message);
            toast({ title: 'Copied!', description: 'Invite message copied to clipboard.' });
        }
    };

    const urgency = getUrgencyLevel();
    const isCritical = urgency === 'critical';
    const isHigh = urgency === 'high';

    const accentColor = isCritical ? '#D64545' : isHigh ? '#E07A5F' : '#A4B8E7';
    const glowColor = isCritical ? '#FFBDBD' : isHigh ? '#FFD4C4' : '#D1DEFA';
    const programEnded = !isProgramActive();

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-8 pb-4 bg-white/50 backdrop-blur-sm border-b border-black/5">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                >
                    <ArrowLeft size={24} className="text-[#1A1A1A]" />
                </button>
                <h1 className="text-[18px] font-bold text-[#1A1A1A]">Early Ambassador</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pt-6 pb-20 space-y-8">
                
                {/* Hero Card */}
                <motion.div 
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="relative bg-white rounded-[24px] p-6 shadow-xl border border-white/50 overflow-hidden flex flex-col items-center text-center"
                    style={{ boxShadow: `0 10px 30px ${glowColor}50` }}
                >
                    {/* Background flare */}
                    <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: accentColor }}></div>

                    {/* Badge */}
                    <div className="px-4 py-1.5 rounded-full mb-5 flex items-center gap-1.5" style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30` }}>
                        <span className="text-[14px]">🔥</span>
                        <span className="text-[11px] font-bold tracking-wide" style={{ color: accentColor }}>
                            {isCritical ? 'LAST CHANCE!' : isHigh ? 'ENDING SOON' : 'FREE PROGRAM ACTIVE'}
                        </span>
                    </div>

                    {programEnded ? (
                        <h2 className="text-[26px] font-black text-[#1A1A1A] mb-4">Program has ended</h2>
                    ) : (
                        <div className="mb-4">
                            <p className="text-[12px] font-bold text-[#8E8E93] tracking-[2px] mb-1 uppercase">You are an</p>
                            <h2 className="text-[32px] font-bold text-[#1A1A1A] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                <i className="text-[#7A96D4]">Early</i> Ambassador
                            </h2>
                        </div>
                    )}

                    <p className="text-[14px] text-[#5A5A6A] leading-relaxed max-w-[280px] mb-8">
                        {programEnded
                            ? 'The Free Ambassador Program has closed. Thank you for being an early supporter.'
                            : 'You joined Metll early — that means confessions, reveals & coffee dates are FREE for you now. After Oct 24, these become paid.'}
                    </p>

                    {/* Countdown */}
                    {!programEnded && time && (
                        <div className="w-full mb-8">
                            <div className="flex items-center justify-center gap-2">
                                <CountBox value={pad(time.days)} label="DAYS" accent={accentColor} />
                                <span className="text-[20px] font-bold -mt-4" style={{ color: accentColor }}>:</span>
                                <CountBox value={pad(time.hours)} label="HRS" accent={accentColor} />
                                <span className="text-[20px] font-bold -mt-4" style={{ color: accentColor }}>:</span>
                                <CountBox value={pad(time.minutes)} label="MIN" accent={accentColor} />
                                <span className="text-[20px] font-bold -mt-4" style={{ color: accentColor }}>:</span>
                                <CountBox value={pad(time.seconds)} label="SEC" accent={accentColor} />
                            </div>
                            <p className="text-[11px] font-medium text-[#8E8E93] mt-4">until features become paid</p>
                        </div>
                    )}

                    {/* Primary CTA */}
                    {!programEnded && (
                        <button 
                            onClick={handleShare}
                            className="w-full bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg mb-6"
                        >
                            <Share2 size={18} />
                            Invite Your Crush — It's Free
                        </button>
                    )}

                    {/* Mystery Hook */}
                    {!programEnded && (
                        <div className="w-full py-3 px-4 rounded-xl flex items-start text-left gap-3 border" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}25` }}>
                            <span className="text-[18px]">😳</span>
                            <p className="text-[13px] text-[#5A5A6A] leading-snug">
                                They receive:{' '}
                                <b style={{ color: accentColor }}>"Someone on Metll may have already confessed to you..."</b>
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* What's FREE */}
                <div>
                    <p className="text-[11px] font-bold text-[#8E8E93] tracking-[1.5px] uppercase mb-1">What you get free</p>
                    <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-6" style={{ fontFamily: 'Georgia, serif' }}>Your ambassador perks</h3>

                    <div className="space-y-4">
                        {FREE_PERKS.map((perk, i) => (
                            <div key={i} className="bg-white p-4 rounded-2xl flex items-start shadow-sm border border-black/5">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4" style={{ backgroundColor: `${accentColor}15` }}>
                                    <perk.icon size={22} color={accentColor} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[15px] font-bold text-[#1A1A1A] mb-1">{perk.title}</h4>
                                    <p className="text-[12px] text-[#6B6B6B] leading-relaxed pr-2">{perk.description}</p>
                                </div>
                                <div className="flex flex-col items-end justify-center pt-1 shrink-0">
                                    <span className="text-[10px] font-bold text-white bg-[#1A1A1A] px-2 py-0.5 rounded uppercase tracking-wider mb-1">FREE</span>
                                    <span className="text-[11px] font-semibold text-[#B0B0B0] line-through">{perk.futurePrice}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Share */}
                {!programEnded && (
                    <div className="pt-4 pb-8 border-t border-black/5">
                        <button 
                            onClick={handleShare}
                            className="w-full bg-white text-[#1A1A1A] font-semibold py-4 rounded-full flex items-center justify-center gap-2 border border-[#E8E8E8] shadow-sm mb-4"
                        >
                            <Share2 size={18} />
                            Share with friends & crush
                        </button>
                        {!loading && referralCode && (
                            <div className="text-center">
                                <span className="text-[13px] text-[#8E8E93] font-medium">Your referral code: </span>
                                <span className="text-[14px] font-bold tracking-wide" style={{ color: accentColor }}>{referralCode}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Terms */}
                <p className="text-[11px] text-[#A0A0A0] text-center leading-relaxed pb-6">
                    By participating, you agree to our <a href="https://metll.in/terms-of-service" className="underline text-[#8E8E93]">Terms of Service</a> and <a href="https://metll.in/privacy" className="underline text-[#8E8E93]">Privacy Policy</a>. Ambassador perks and future prices are subject to change.
                </p>

            </div>
        </div>
    );
}
