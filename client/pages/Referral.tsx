import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, Download, Wallet, Coffee, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { referralApi } from '../lib/referralApi';
import { walletApi } from '../lib/walletApi';
import { useToast } from '@/components/ui/use-toast';

const COFFEE_REWARD_EVERY = 10;

export default function Referral() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const magnetVideoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [rewards, setRewards] = useState<any[]>([]);
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [redeeming, setRedeeming] = useState(false);

    // Withdrawal modal state
    const [withdrawVisible, setWithdrawVisible] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawing, setWithdrawing] = useState(false);

    useEffect(() => {
    // Force-play mascot video on mobile
    if (magnetVideoRef.current) {
      magnetVideoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
        loadReferralData();
    }, []);

    const loadReferralData = async () => {
        try {
            setLoading(true);
            const response = await referralApi.getStats();
            if (response.success && response.data) {
                setStats(response.data.stats);
                setRewards(response.data.rewards || []);
                setWithdrawals((response.data as any).withdrawals || []);
                if ((response.data.stats as any)?.upiId) {
                    setUpiId((response.data.stats as any).upiId);
                }
            }
        } catch (error) {
            console.error('Error loading referral data:', error);
            toast({ title: 'Error', description: 'Failed to load referral data', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const coinsPerReferral = stats?.coinsPerReferral ?? 10;
    const coinBalance = stats?.coinBalance ?? 0;
    const totalCoinsEarned = stats?.totalCoinsEarned ?? 0;

    const handleShare = async () => {
        if (!stats?.referralCode) return;
        const message = `Join me on Metll - the dating app for meaningful connections! Download the app and sign up with my code ${stats.referralCode} — every download earns me ${coinsPerReferral} Magnets (₹${coinsPerReferral}) and gets us closer to free coffee dates! ☕🧲`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Metll Referral',
                    text: message,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            await navigator.clipboard.writeText(message);
            toast({ title: 'Copied!', description: 'Referral message copied to clipboard.' });
        }
    };

    const handleCopyCode = async () => {
        if (!stats?.referralCode) return;
        await navigator.clipboard.writeText(stats.referralCode);
        toast({ title: 'Copied!', description: 'Code copied to clipboard.' });
    };

    const handleRedeem = async () => {
        try {
            setRedeeming(true);
            const response = await referralApi.redeemReward();
            if (response.success) {
                toast({ title: 'Success!', description: 'Reward redeemed successfully! Enjoy your coffee date! ☕' });
                loadReferralData(); // Refresh data
            } else {
                toast({ title: 'Error', description: response.message || 'Failed to redeem reward', variant: 'destructive' });
            }
        } catch (error: any) {
            console.error('Redeem error', error);
            toast({ title: 'Error', description: 'Failed to redeem reward', variant: 'destructive' });
        } finally {
            setRedeeming(false);
        }
    };

    const openWithdraw = () => {
        setWithdrawAmount(String(coinBalance));
        setWithdrawVisible(true);
    };

    const handleWithdraw = async () => {
        const amount = parseInt(withdrawAmount, 10);

        if (!upiId.trim()) {
            toast({ title: 'UPI ID required', description: 'Please enter your UPI ID to receive the money.', variant: 'destructive' });
            return;
        }
        if (!/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.trim())) {
            toast({ title: 'Invalid UPI ID', description: 'Please enter a valid UPI ID, e.g. name@upi', variant: 'destructive' });
            return;
        }
        if (!amount || amount <= 0) {
            toast({ title: 'Invalid amount', description: 'Please enter how many Magnets you want to withdraw.', variant: 'destructive' });
            return;
        }
        if (amount > coinBalance) {
            toast({ title: 'Not enough Magnets', description: `You only have ${coinBalance} Magnets in your wallet.`, variant: 'destructive' });
            return;
        }

        try {
            setWithdrawing(true);
            const response = await walletApi.withdraw(upiId.trim(), amount);
            if (response.success) {
                setWithdrawVisible(false);
                toast({ 
                    title: 'Request submitted! 🎉', 
                    description: `₹${amount} is on its way to ${upiId.trim()}. The amount will be reflected in your account within 3-5 working days.` 
                });
                loadReferralData();
            } else {
                toast({ title: 'Error', description: response.message || 'Failed to submit withdrawal', variant: 'destructive' });
            }
        } catch (error) {
            console.error('Withdraw error', error);
            toast({ title: 'Error', description: 'Failed to submit withdrawal. Please try again.', variant: 'destructive' });
        } finally {
            setWithdrawing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen bg-[#F8F9FC]">
                <div className="w-8 h-8 border-4 border-[#7A96D4] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const availableRewards = rewards.filter(r => r.status === 'available').length;
    const progressToNextReward = (stats?.totalReferrals || 0) % COFFEE_REWARD_EVERY;

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#EBF3FF] via-[#F5EBFB] to-[#FAFAFA]">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-100px] right-[-80px] w-[320px] h-[320px] rounded-full bg-[#A4B8E7]/25 mix-blend-multiply blur-xl"></div>
            <div className="absolute top-[280px] left-[-100px] w-[280px] h-[280px] rounded-full bg-[#C2E9FB]/25 mix-blend-multiply blur-xl"></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-8 pb-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-sm"
                >
                    <ArrowLeft size={24} className="text-[#1A1A1A]" />
                </button>
                <h1 className="text-[18px] font-bold text-[#1A1A1A]">Refer & Earn</h1>
                <div className="w-10"></div>
            </div>

            <div className="relative z-10 px-5 pb-10 space-y-6 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar">
                
                {/* Banner */}
                <div className="bg-white/85 rounded-[28px] p-7 flex flex-col items-center border border-white/95 shadow-[0_8px_20px_rgba(164,184,231,0.25)]">
                    <div className="relative mb-4 flex items-center justify-center">
                        <div className="absolute w-[140px] h-[140px] rounded-full bg-[#A4B8E7]/35 shadow-[0_8px_20px_rgba(139,163,219,0.4)] animate-pulse"></div>
                        <div className="w-[140px] h-[140px] rounded-full bg-white/95 border-2 border-white/90 shadow-[0_6px_12px_rgba(164,184,231,0.18)] flex items-center justify-center overflow-hidden z-10 relative">
                            <video
                                ref={magnetVideoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-[135px] h-[135px] object-contain pointer-events-none"
                            >
                                <source src="/mascot/mascot_magnet_video.webm" type="video/webm" />
                                <source src="/mascot/mascot_magnet_video.mp4" type="video/mp4" />
                                <img
                                    src="/mascot/mascot_magnet.png"
                                    alt="Mascot Magnet"
                                    className="w-[135px] h-[135px] object-contain"
                                />
                            </video>
                        </div>
                    </div>
                    <h2 className="text-[26px] font-bold text-[#1A1A1A] mb-2 tracking-tight">Earn Magnets</h2>
                    <p className="text-[14px] text-[#6B6B6B] text-center leading-[22px] max-w-[300px]">
                        Every friend who downloads Metll with your code earns you {coinsPerReferral} Magnets — that's ₹{coinsPerReferral}, redeemable as real cash!
                    </p>
                    <div className="flex items-center gap-1.5 bg-[#A4B8E7]/20 rounded-full py-2 px-4 mt-4 border border-[#A4B8E7]/40">
                        <span className="text-[14px] font-bold text-[#1A1A1A]">1</span>
                        <img src="/magnet-logo.png" alt="Magnet" className="w-6 h-6 object-contain" />
                        <span className="text-[14px] font-bold text-[#1A1A1A]">= ₹1</span>
                    </div>
                </div>

                {/* Magnet Wallet */}
                <div className="bg-white/85 rounded-[24px] p-6 border border-white/95 shadow-[0_6px_16px_rgba(164,184,231,0.15)]">
                    <div className="flex items-center">
                        <div className="w-[52px] h-[52px] rounded-full bg-[#FFFdf0] border border-[#F5D76E] flex items-center justify-center mr-4 shrink-0 overflow-hidden">
                            <img src="/mascot/mascot_magnet.png" alt="Mascot Magnet" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] font-medium text-[#8E8E93] tracking-[1.5px] mb-0.5 uppercase">MAGNET BALANCE</p>
                            <div className="flex items-end gap-2">
                                <span className="text-[34px] font-bold text-[#1A1A1A] leading-[42px]">{coinBalance}</span>
                                <span className="text-[15px] font-medium text-[#B48E00] mb-1.5">≈ ₹{coinBalance}</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] bg-black/5 my-4"></div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[12px] font-medium text-[#8E8E93]">Total earned</p>
                            <p className="text-[14px] font-semibold text-[#1A1A1A]">{totalCoinsEarned} Magnets · ₹{totalCoinsEarned}</p>
                        </div>
                        <button 
                            onClick={openWithdraw}
                            disabled={coinBalance <= 0}
                            className={`flex items-center gap-2 py-3 px-5 rounded-full shadow-md transition-all ${coinBalance > 0 ? 'bg-[#A4B8E7] text-[#1A1A1A] hover:bg-[#8CA3D4]' : 'bg-[#F0F0F0] text-[#8E8E93] shadow-none'}`}
                        >
                            <Wallet size={18} />
                            <span className="text-[14px] font-semibold">Withdraw</span>
                        </button>
                    </div>

                    {coinBalance <= 0 && (
                        <p className="text-[12px] text-[#8E8E93] mt-3 text-center">
                            Refer friends to earn Magnets you can withdraw as cash
                        </p>
                    )}
                </div>

                {/* Referral Code */}
                <div className="bg-white rounded-[20px] p-6 border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                    <p className="text-[12px] font-medium text-[#8E8E93] text-center uppercase tracking-[1.5px] mb-4">Your Referral Code</p>
                    <button onClick={handleCopyCode} className="w-full flex items-center justify-center bg-[#f8f8f8] py-4 px-6 rounded-2xl mb-5 border border-[#eee] border-dashed">
                        <span className="text-[22px] font-bold text-[#1A1A1A] mr-3 tracking-[2px]">{stats?.referralCode || '...'}</span>
                        <Copy size={20} className="text-[#1A1A1A]" />
                    </button>
                    <button onClick={handleShare} className="w-full bg-[#1A1A1A] text-white font-medium text-[16px] h-[54px] rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] flex items-center justify-center">
                        Share Code
                    </button>
                </div>

                {/* How it works */}
                <div>
                    <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4 px-1">How It Works</h3>
                    <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative">
                        
                        <div className="flex items-start mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center mr-4 shrink-0">
                                <Share2 size={20} className="text-[#1A1A1A]" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Share your code</h4>
                                <p className="text-[13px] text-[#6B6B6B] mt-0.5">Send your referral code to friends</p>
                            </div>
                        </div>

                        <div className="absolute left-[39px] top-[45px] w-[2px] h-10 bg-[#E8E8E8] z-0"></div>

                        <div className="flex items-start mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center mr-4 shrink-0">
                                <Download size={20} className="text-[#1A1A1A]" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Friend downloads & joins</h4>
                                <p className="text-[13px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                                    Every download gives you {coinsPerReferral} Magnets = ₹{coinsPerReferral}. Each device counts only once — genuine downloads only!
                                </p>
                            </div>
                        </div>

                        <div className="absolute left-[39px] top-[115px] w-[2px] h-14 bg-[#E8E8E8] z-0"></div>

                        <div className="flex items-start mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center mr-4 shrink-0">
                                <Wallet size={20} className="text-[#1A1A1A]" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Withdraw to UPI</h4>
                                <p className="text-[13px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                                    Redeem your Magnets as cash — the amount reflects in your account within 3-5 working days
                                </p>
                            </div>
                        </div>

                        <div className="absolute left-[39px] top-[195px] w-[2px] h-12 bg-[#E8E8E8] z-0"></div>

                        <div className="flex items-start relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center mr-4 shrink-0">
                                <Coffee size={20} className="text-[#1A1A1A]" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Bonus: free coffee date</h4>
                                <p className="text-[13px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                                    Invite {COFFEE_REWARD_EVERY} friends and unlock a FREE coffee date ☕
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Progress */}
                <div>
                    <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4 px-1">Your Progress</h3>
                    
                    <div className="flex justify-between mb-5">
                        <div className="bg-white rounded-2xl p-4 flex-1 mr-3 flex flex-col items-center justify-center shadow-sm">
                            <p className="text-[20px] font-bold text-[#1A1A1A]">{stats?.totalReferrals || 0}</p>
                            <p className="text-[11px] font-medium text-[#8E8E93] mt-1">Invited</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 flex-1 mr-3 flex flex-col items-center justify-center shadow-sm border border-[#F5D76E]/30">
                            <p className="text-[20px] font-bold text-[#B48E00]">{totalCoinsEarned}</p>
                            <p className="text-[11px] font-medium text-[#8E8E93] mt-1 text-center leading-tight">Magnets Earned</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col items-center justify-center shadow-sm">
                            <p className="text-[20px] font-bold text-[#1A1A1A]">{availableRewards}</p>
                            <p className="text-[11px] font-medium text-[#8E8E93] mt-1 text-center">Rewards</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-[14px] font-bold text-[#1A1A1A]">Next Coffee Date</p>
                            <p className="text-[14px] font-bold text-[#7A96D4]">{progressToNextReward}/{COFFEE_REWARD_EVERY}</p>
                        </div>
                        <div className="w-full h-3 bg-[#F0F0F0] rounded-full overflow-hidden mb-3">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(progressToNextReward / COFFEE_REWARD_EVERY) * 100}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-[#7A96D4] to-[#5470B8] rounded-full"
                            />
                        </div>
                        <p className="text-[12px] text-[#8E8E93] font-medium text-center">
                            {COFFEE_REWARD_EVERY - progressToNextReward} more referrals to unlock a free coffee date
                        </p>
                    </div>
                </div>

                {/* Rewards Action */}
                {availableRewards > 0 && (
                    <div className="bg-[#FFFDF0] rounded-2xl p-5 border border-[#F5D76E] shadow-sm flex flex-col items-center">
                        <p className="text-[16px] font-bold text-[#B48E00] mb-4">You have rewards to claim!</p>
                        <button 
                            onClick={handleRedeem}
                            disabled={redeeming}
                            className="bg-[#F5D76E] hover:bg-[#E8CA60] text-[#1A1A1A] font-bold py-3 px-6 rounded-full w-full flex items-center justify-center"
                        >
                            {redeeming ? (
                                <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Redeem Coffee Date"
                            )}
                        </button>
                    </div>
                )}

                {/* Withdrawals */}
                {withdrawals.length > 0 && (
                    <div className="pb-10">
                        <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4 px-1">Withdrawals</h3>
                        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-black/5">
                            {withdrawals.map((w, index) => {
                                const isCompleted = w.status === 'completed';
                                const isRejected = w.status === 'rejected';
                                return (
                                    <div key={w.id} className="relative">
                                        {index > 0 && <div className="h-[1px] bg-black/5 mx-5"></div>}
                                        <div className="p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-[16px] font-bold text-[#1A1A1A]">₹{w.amountRupees}</p>
                                                <p className="text-[13px] text-[#6B6B6B] mt-1">{w.upiId}</p>
                                                {w.status === 'pending' && (
                                                    <p className="text-[11px] text-[#A4B8E7] mt-1 flex items-center gap-1">
                                                        <Clock size={12} /> Reflects in 3-5 working days
                                                    </p>
                                                )}
                                            </div>
                                            <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                isCompleted ? 'bg-[#E8F8F0] text-[#00A152]' :
                                                isRejected ? 'bg-[#FCE8E8] text-[#E74C3C]' :
                                                'bg-[#FFF9E6] text-[#D49800]'
                                            }`}>
                                                {isCompleted ? 'Paid' : isRejected ? 'Refunded' : 'Processing'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Withdraw Modal Bottom Sheet */}
            <AnimatePresence>
                {withdrawVisible && (
                    <div className="fixed inset-0 z-50 flex items-end justify-center">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setWithdrawVisible(false)}
                        />
                        <motion.div 
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-white w-full max-w-md rounded-t-[32px] p-6 pb-12 relative z-10 shadow-2xl"
                        >
                            <div className="w-12 h-1.5 bg-[#E8E8E8] rounded-full mx-auto mb-6"></div>
                            <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-1">Withdraw Magnets</h2>
                            <p className="text-[14px] text-[#8E8E93] mb-6">
                                {coinBalance} Magnets available · 1 Magnet = ₹1
                            </p>

                            <label className="block text-[13px] font-bold text-[#1A1A1A] mb-2">UPI ID</label>
                            <input 
                                type="text"
                                value={upiId}
                                onChange={e => setUpiId(e.target.value)}
                                placeholder="yourname@upi"
                                className="w-full h-14 bg-[#F8F9FC] border border-[#E8E8E8] rounded-2xl px-4 text-[16px] mb-5 focus:outline-none focus:border-[#7A96D4]"
                            />

                            <label className="block text-[13px] font-bold text-[#1A1A1A] mb-2">Magnets to withdraw</label>
                            <input 
                                type="number"
                                value={withdrawAmount}
                                onChange={e => setWithdrawAmount(e.target.value)}
                                placeholder="Amount"
                                className="w-full h-14 bg-[#F8F9FC] border border-[#E8E8E8] rounded-2xl px-4 text-[16px] mb-6 focus:outline-none focus:border-[#7A96D4]"
                            />

                            <div className="bg-[#FFFDF0] border border-[#F5D76E] rounded-xl p-4 flex items-start gap-3 mb-8">
                                <Clock size={20} className="text-[#B48E00] shrink-0 mt-0.5" />
                                <p className="text-[13px] text-[#B48E00] leading-relaxed">
                                    The amount will be reflected in your account within 3-5 working days.
                                </p>
                            </div>

                            <button 
                                onClick={handleWithdraw}
                                disabled={withdrawing}
                                className="w-full bg-[#A4B8E7] hover:bg-[#8CA3D4] text-[#1A1A1A] font-bold h-14 rounded-full flex items-center justify-center transition-colors"
                            >
                                {withdrawing ? (
                                    <div className="w-6 h-6 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    `Withdraw ₹${parseInt(withdrawAmount, 10) || 0}`
                                )}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
