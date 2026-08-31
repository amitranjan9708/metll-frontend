import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, HelpCircle, Heart, CheckCircle, Book, BookOpen, Briefcase, Trash2, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { confessionApi } from '../lib/confessionApi';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'sent' | 'received';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any; bgColor: string }> = {
  pending: { label: 'Waiting', color: '#F59E0B', icon: Clock, bgColor: '#FEF3C7' },
  awaiting_confirmation: { label: 'Confirm?', color: '#8B5CF6', icon: HelpCircle, bgColor: '#EDE9FE' },
  matched: { label: 'Matched!', color: '#10B981', icon: Heart, bgColor: '#D1FAE5' },
  delivered: { label: 'Seen', color: '#667EEA', icon: CheckCircle, bgColor: '#E0E7FF' },
};

const INSTITUTION_ICONS: Record<string, any> = {
  school: Book,
  college: BookOpen,
  office: Briefcase,
};

export default function MyConfessions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [myConfessions, setMyConfessions] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const sentResult = await confessionApi.getMyConfessions();

      if (sentResult.success && sentResult.data) {
        setMyConfessions(sentResult.data.confessions);
      }
    } catch (error) {
      console.error('Load confessions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfession = async (confessionId: number) => {
    if (window.confirm('Are you sure you want to delete this confession?')) {
      try {
        const response = await confessionApi.deleteConfession(confessionId);
        if (response.success) {
          setMyConfessions(prev => prev.filter(c => c.id !== confessionId));
        } else {
          alert('Failed to delete confession');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const renderSentConfession = (confession: any) => {
    const statusConfig = STATUS_CONFIG[confession.status] || STATUS_CONFIG.pending;
    const StatusIcon = statusConfig.icon;
    const InstIcon = INSTITUTION_ICONS[confession.institutionType] || BookOpen;

    return (
      <motion.div 
        key={confession.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[24px] p-5 mb-4 border border-gray-100 shadow-sm relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
              <InstIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 capitalize">
                {confession.crushFirstName}
              </h3>
              <p className="text-[13px] text-gray-500 capitalize">
                {confession.institutionType} Match
              </p>
            </div>
          </div>
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: statusConfig.bgColor }}
          >
            <StatusIcon size={14} color={statusConfig.color} />
            <span className="text-[12px] font-bold" style={{ color: statusConfig.color }}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[16px] p-4 mb-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                INSTITUTION
              </span>
              <span className="text-[14px] font-medium text-gray-800">
                {confession.institutionName || 'Not specified'}
              </span>
            </div>
            {confession.department && (
              <div className="flex-1 border-l border-gray-200 pl-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  DEPARTMENT
                </span>
                <span className="text-[14px] font-medium text-gray-800">
                  {confession.department}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[12px] text-gray-400">
            Sent {new Date(confession.createdAt).toLocaleDateString()}
          </span>
          <button 
            onClick={() => handleDeleteConfession(confession.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </motion.div>
    );
  };



  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">My Confessions</h1>
        <div className="w-10" />
      </div>



      {/* Content */}
      <div className="px-6 flex-1">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {myConfessions.length > 0 ? (
              myConfessions.map(renderSentConfession)
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Mail size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Sent Confessions</h3>
                <p className="text-gray-500 max-w-[250px] mb-8">
                  Take the leap! Confess to your crush and see if it's a match.
                </p>
                <button 
                  onClick={() => navigate('/confess')}
                  className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-black transition-colors"
                >
                  Send a Confession
                </button>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
