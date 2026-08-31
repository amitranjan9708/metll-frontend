import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, ChevronDown, MessageSquare, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpCenter() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: 'how-matching-works',
      question: 'How does matching work?',
      answer: 'Metll uses our unique situation-based matching algorithm. You answer prompts and scenarios, and we match you with people who share similar values and relationship goals. The more you engage, the better your matches become!',
    },
    {
      id: 'edit-profile',
      question: 'How do I edit my profile?',
      answer: 'Go to your Profile tab and tap on "Edit Profile". You can update your photos, bio, interests, and answer new prompts from there.',
    },
    {
      id: 'delete-account',
      question: 'How do I delete my account?',
      answer: 'Go to Settings → Privacy & Security → Delete Account. Please note that this action is permanent and cannot be undone. All your data, matches, and messages will be permanently deleted.',
    },
    {
      id: 'report-user',
      question: 'How do I report a user?',
      answer: 'You can report a user by opening their profile and tapping the menu icon (three dots) in the top right corner, then selecting "Report". Our team reviews all reports within 24-48 hours.',
    },
    {
      id: 'privacy',
      question: 'Is my data safe?',
      answer: 'Yes! We take your privacy seriously. Your data is encrypted, and we never share your personal information with third parties. You can read our full Privacy Policy for more details.',
    },
  ];

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Metll App Support');
    const body = encodeURIComponent('Hi Metll Support,\n\nI need help with:\n\n');
    window.location.href = `mailto:support@metll.in?subject=${subject}&body=${body}`;
  };

  const toggleFaq = (id: string) => {
    if (activeFaq === id) {
      setActiveFaq(null);
    } else {
      setActiveFaq(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Help Center</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 pt-6 flex-1">
        
        {/* Support Options */}
        <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4 ml-1">Contact Us</h2>
        
        <div className="flex flex-col gap-3 mb-8">
          <button 
            onClick={handleContactSupport}
            className="flex items-center p-5 bg-white rounded-[20px] border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-left w-full"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 mr-4">
              <Mail size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Email Support</h3>
              <p className="text-[13px] text-gray-500 leading-snug mt-1">support@metll.in</p>
            </div>
          </button>
          
          <button 
            onClick={() => window.open('https://metll.in', '_blank')}
            className="flex items-center p-5 bg-white rounded-[20px] border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-left w-full"
          >
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0 mr-4">
              <ExternalLink size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Visit Website</h3>
              <p className="text-[13px] text-gray-500 leading-snug mt-1">metll.in</p>
            </div>
          </button>
        </div>

        {/* FAQs */}
        <h2 className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-4 ml-1">Frequently Asked Questions</h2>
        
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isExpanded = activeFaq === faq.id;
            
            return (
              <div key={faq.id} className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-[15px] font-bold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown className={`text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={20} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-gray-50 mt-1">
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
