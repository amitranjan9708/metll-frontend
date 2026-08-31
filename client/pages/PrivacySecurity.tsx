import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, EyeOff, Search, UserX, Trash2, Key, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../lib/userApi';

export default function PrivacySecurity() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  
  // Settings
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastSeen, setShowLastSeen] = useState(true);
  const [hideFromSearch, setHideFromSearch] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUserProfile();
      if (response.success && response.data?.user) {
        const userData = response.data.user;
        setShowOnlineStatus(userData.showOnlineStatus ?? true);
        setShowLastSeen(userData.showLastSeen ?? true);
        setHideFromSearch(userData.hideFromSearch ?? false);
      }
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (field: string, value: boolean) => {
    // Optimistic update
    if (field === 'showOnlineStatus') setShowOnlineStatus(value);
    if (field === 'showLastSeen') setShowLastSeen(value);
    if (field === 'hideFromSearch') setHideFromSearch(value);

    try {
      const updateData: any = { [field]: value };
      
      if (field === 'hideFromSearch') {
        updateData.hideFromSearchEnabledAt = value ? new Date().toISOString() : null;
      }

      const response = await userApi.updateProfile(updateData);
      
      if (!response.success) {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      alert('Failed to update privacy settings');
      // Revert on failure
      if (field === 'showOnlineStatus') setShowOnlineStatus(!value);
      if (field === 'showLastSeen') setShowLastSeen(!value);
      if (field === 'hideFromSearch') setHideFromSearch(!value);
    }
  };

  const ToggleItem = ({ icon: Icon, title, description, value, field }: any) => (
    <div className="flex items-center justify-between p-5 bg-white rounded-[20px] mb-3 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 flex-1 pr-4">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-[16px] font-bold text-gray-900 leading-tight">{title}</h3>
          <p className="text-[13px] text-gray-500 leading-snug mt-1">{description}</p>
        </div>
      </div>
      
      <button 
        onClick={() => handleToggle(field, !value)}
        className={`w-12 h-7 rounded-full p-1 transition-colors ${value ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  const ActionItem = ({ icon: Icon, title, description, onClick, isDestructive = false }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-5 bg-white rounded-[20px] mb-3 border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-left ${isDestructive ? 'hover:border-red-100' : ''}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <h3 className={`text-[16px] font-bold leading-tight ${isDestructive ? 'text-red-500' : 'text-gray-900'}`}>{title}</h3>
        {description && <p className="text-[13px] text-gray-500 leading-snug mt-1">{description}</p>}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Privacy & Security</h1>
        <div className="w-10" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="px-6 pt-6 flex-1">
          
          <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4 ml-1">Visibility</h2>
          
          <ToggleItem 
            icon={Eye} 
            title="Show Online Status" 
            description="Let others see when you are actively using Metll" 
            value={showOnlineStatus} 
            field="showOnlineStatus" 
          />
          
          <ToggleItem 
            icon={Clock} 
            title="Show Last Seen" 
            description="Show the time you were last active" 
            value={showLastSeen} 
            field="showLastSeen" 
          />
          
          <ToggleItem 
            icon={Search} 
            title="Hide from Discovery" 
            description="Your profile won't be shown to new potential matches. Existing matches are unaffected." 
            value={hideFromSearch} 
            field="hideFromSearch" 
          />

          <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4 mt-8 ml-1">Account & Security</h2>
          
          <ActionItem 
            icon={Key} 
            title="Change Password" 
            description="Update your account password" 
            onClick={() => alert('Password management coming soon')} 
          />
          
          <ActionItem 
            icon={UserX} 
            title="Blocked Users" 
            description="Manage people you've blocked" 
            onClick={() => alert('Blocked users list coming soon')} 
          />

          <h2 className="text-[14px] font-bold text-red-400 uppercase tracking-wider mb-4 mt-8 ml-1">Danger Zone</h2>
          
          <ActionItem 
            icon={Trash2} 
            title="Delete Account" 
            description="Permanently delete your profile and all data" 
            onClick={() => navigate('/deletion')} 
            isDestructive={true}
          />
          
        </div>
      )}
    </div>
  );
}
