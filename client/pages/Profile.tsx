import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, Mail, Heart, Coffee, User, Ribbon, Gift, 
  Lock, HelpCircle, FileText, LogOut, ShieldCheck, Plus
} from 'lucide-react';
import { swipeApi } from '../lib/swipeApi';
import { confessionApi } from '../lib/confessionApi';
import { StoryRing } from '../components/StoryRing';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [matchesCount, setMatchesCount] = useState(0);
  const [confessionsCount, setConfessionsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [matches, confessionsRes, likes] = await Promise.all([
        swipeApi.getMatches().catch(() => []),
        confessionApi.getMyConfessions().catch(() => ({ data: { confessions: [] } })),
        swipeApi.getWhoLikedMe().catch(() => []),
      ]);

      setMatchesCount(matches?.length || 0);
      setConfessionsCount(confessionsRes?.data?.confessions?.length || 0);
      setLikesCount(likes?.length || 0);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout();
      navigate('/register');
    }
  };

  const settingsItems = [
    {
      icon: Coffee,
      title: 'Dates',
      subtitle: 'See your upcoming connections',
      iconBg: '#4A4A4A',
      onPress: () => navigate('/date'),
    },
    {
      icon: Mail,
      title: 'My Confessions',
      subtitle: 'View and manage your confessions',
      iconBg: '#4A4A4A',
      onPress: () => navigate('/matches'), // Will add proper route later
    },
    {
      icon: User,
      title: 'Edit Profile',
      subtitle: 'Update your photos and info',
      iconBg: '#4A4A4A',
      onPress: () => navigate('/profile'),
    },
    {
      icon: Ribbon,
      title: 'Ambassador Program',
      subtitle: 'Free until Oct 24 — invite your crush',
      iconBg: '#4A4A4A',
      onPress: () => alert('Ambassador program coming soon on Web'),
    },
    {
      icon: Gift,
      title: 'Invite Friends & Earn',
      subtitle: 'Get rewards for referring friends',
      iconBg: 'transparent',
      onPress: () => navigate('/referral'),
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      subtitle: 'Manage your account safety',
      iconBg: '#4A4A4A',
      onPress: () => alert('Privacy & Security coming soon'),
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      subtitle: 'Get help with your account',
      iconBg: '#4A4A4A',
      onPress: () => alert('Help Center coming soon'),
    },
    {
      icon: FileText,
      title: 'Privacy Policy',
      subtitle: 'Read our privacy guidelines',
      iconBg: '#4A4A4A',
      onPress: () => window.open('https://metll.in/privacy', '_blank'),
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <User className="w-10 h-10 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <div className="px-6 pt-10 pb-6 overflow-y-auto">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative cursor-pointer" onClick={() => alert('Story upload coming soon!')}>
            <StoryRing
              profilePhoto={user?.photo}
              hasActiveStory={false}
              hasUnseenStory={false}
              size={88}
              disabled={true}
              className="mb-4"
            />
            <div className="absolute bottom-4 right-0 w-7 h-7 rounded-full bg-[#E07A5F] flex items-center justify-center border-[3px] border-[#FAFAFA]">
              <Plus size={16} className="text-white" />
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 mb-1">
            <h2 className="text-2xl font-bold text-[#1A1A1A] max-w-[200px] truncate">
              {user.name}
            </h2>
            {user?.isOnboarded && (
              <div className="flex items-center justify-center w-5 h-5 bg-[#3B82F6] rounded-full">
                <ShieldCheck size={12} className="text-white" />
              </div>
            )}
          </div>
          <p className="text-[15px] text-[#6B6B6B] mb-3">{user?.phone || user?.email || ''}</p>

          {!user?.isOnboarded && (
            <button 
              onClick={() => alert('Verification coming soon')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#1E1E1E] to-[#000000] text-white shadow-sm hover:scale-[1.02] transition-transform active:scale-95"
            >
              <ShieldCheck size={16} />
              <span className="text-sm font-semibold">Get Verified</span>
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="flex justify-between gap-3 mb-6">
          <div 
            onClick={() => navigate('/matches')}
            className="flex-1 bg-white rounded-[20px] p-4 flex flex-col items-center border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#4A4A4A] flex items-center justify-center mb-2">
              <Users size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">{matchesCount}</span>
            <span className="text-[13px] font-medium text-[#8E8E93]">Matches</span>
          </div>

          <div 
            onClick={() => navigate('/matches')}
            className="flex-1 bg-white rounded-[20px] p-4 flex flex-col items-center border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#4A4A4A] flex items-center justify-center mb-2">
              <Mail size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">{confessionsCount}</span>
            <span className="text-[13px] font-medium text-[#8E8E93]">Confessions</span>
          </div>

          <div 
            className="flex-1 bg-white rounded-[20px] p-4 flex flex-col items-center border border-black/5 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#4A4A4A] flex items-center justify-center mb-2">
              <Heart size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">{likesCount}</span>
            <span className="text-[13px] font-medium text-[#8E8E93]">Likes</span>
          </div>
        </div>

        {/* Inspirational Quote Card */}
        <div className="mb-6 mt-3">
          <div 
            className="rounded-[24px] p-6 overflow-hidden flex items-center justify-center min-h-[180px] relative bg-cover bg-center"
            style={{ backgroundImage: `url('/settings_quote_bg.png')` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <p className="text-white text-[18px] font-medium text-center leading-[26px] tracking-wide relative z-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              "Speak your heart, anonymously. The right connection is waiting."
            </p>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex flex-col gap-3 mb-8">
          {settingsItems.map((item, index) => (
            <div 
              key={index}
              onClick={item.onPress}
              className="bg-white rounded-[20px] p-4 flex items-center border border-black/5 shadow-sm cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              <div 
                className="w-12 h-12 rounded-[16px] flex items-center justify-center mr-4"
                style={{ backgroundColor: item.iconBg }}
              >
                {item.title === 'Invite Friends & Earn' ? (
                  <motion.img 
                    src="/magnet-logo.png" 
                    alt="Magnet"
                    className="w-9 h-9 object-contain"
                    animate={{ rotate: [-10, 0, 10, 0, -10] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                ) : (
                  <item.icon size={22} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-0.5">{item.title}</h3>
                <p className="text-[13px] text-[#8E8E93]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 mb-6 border-none bg-transparent hover:opacity-75 transition-opacity"
        >
          <LogOut size={20} className="text-[#D64545]" />
          <span className="text-[17px] font-bold text-[#D64545]">Log out</span>
        </button>

        {/* Version */}
        <p className="text-center text-[13px] font-medium text-[#A0A0A0] mb-8 tracking-wide">Version 1.0.0</p>
        
      </div>
    </div>
  );
}
