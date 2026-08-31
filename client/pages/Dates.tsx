import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, Gift, Heart, Calendar } from 'lucide-react';
import { swipeApi } from '../lib/swipeApi';
import { referralApi } from '../lib/referralApi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dates() {
  const navigate = useNavigate();
  
  const [matches, setMatches] = useState<any[]>([]);
  const [referralTickets, setReferralTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [matchesData, ticketsResponse] = await Promise.all([
        swipeApi.getMatches().catch(() => []),
        referralApi.getReferralTickets().catch(() => ({ success: false, data: { tickets: [] } })),
      ]);
      setMatches(matchesData);
      if (ticketsResponse.success && ticketsResponse.data?.tickets) {
        setReferralTickets(ticketsResponse.data.tickets);
      }
    } catch (error) {
      console.error('Load data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setClaimModalVisible(true);
  };

  const handleSelectMatch = async (match: any) => {
    if (!selectedTicket) return;

    try {
      setClaiming(true);
      const response = await referralApi.claimTicket(selectedTicket.id, match.id);
      if (response.success) {
        await loadData();
        setClaimModalVisible(false);
        setSelectedTicket(null);
      } else {
        alert(response.message || 'Failed to claim ticket');
      }
    } catch (error) {
      console.error('Claim ticket error:', error);
    } finally {
      setClaiming(false);
    }
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const now = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const coffeeTicketMatches = matches.filter(m => m.coffeeTicket);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Dates & Rewards</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 pt-6 flex-1">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1A1A1A] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Tickets Section */}
            {referralTickets.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[15px] font-bold text-gray-500 uppercase tracking-wider mb-4">Your Tickets</h2>
                <div className="flex flex-col gap-4">
                  {referralTickets.map(ticket => {
                    const daysLeft = getDaysUntilExpiry(ticket.expiresAt);
                    const isAvailable = ticket.status === 'available';

                    return (
                      <motion.div 
                        key={ticket.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm relative"
                      >
                        <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-[#A4B8E7] to-[#E8B4C8]" />
                        <div className="p-5 pl-7">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-gray-900">
                              <Gift size={20} className="text-[#A4B8E7]" />
                              <h3 className="text-[17px] font-bold">Coffee Date on Us!</h3>
                            </div>
                            <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
                              isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {isAvailable ? 'Available' : 'Claimed'}
                            </span>
                          </div>
                          
                          <p className="text-[14px] text-gray-500 mb-4">
                            You referred {ticket.referredUserName || 'a friend'}. Take a match out for coffee!
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[13px] font-medium text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">
                              <Calendar size={14} />
                              <span>Expires in {daysLeft} days</span>
                            </div>
                            
                            {isAvailable && (
                              <button 
                                onClick={() => handleClaimTicket(ticket)}
                                className="bg-[#1A1A1A] text-white px-5 py-2 rounded-xl text-[14px] font-bold hover:bg-black transition-colors"
                              >
                                Claim Now
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Dates Section */}
            <div className="mb-8">
              <h2 className="text-[15px] font-bold text-gray-500 uppercase tracking-wider mb-4">Upcoming Dates</h2>
              
              {coffeeTicketMatches.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {coffeeTicketMatches.map(match => (
                    <div key={match.id} className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden">
                        {match.photo ? (
                          <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">
                            {match.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[17px] font-bold text-gray-900">{match.name}</h3>
                        <p className="text-[13px] text-[#A4B8E7] font-semibold flex items-center gap-1 mt-0.5">
                          <Coffee size={14} /> Free Coffee Date
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-rose-50 transition-colors">
                        <Heart size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee size={28} className="text-gray-300" />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-2">No upcoming dates</h3>
                  <p className="text-[14px] text-gray-500">
                    Claim a referral ticket or keep matching to setup your first date!
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Claim Modal */}
      <AnimatePresence>
        {claimModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => !claiming && setClaimModalVisible(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden z-10 shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">Choose a Match</h3>
                <p className="text-sm text-gray-500 text-center">Select who you want to take out for coffee</p>
              </div>
              <div className="p-4 max-h-[50vh] overflow-y-auto bg-gray-50">
                {matches.filter(m => !m.coffeeTicket).length > 0 ? (
                  matches.filter(m => !m.coffeeTicket).map(match => (
                    <button
                      key={match.id}
                      onClick={() => handleSelectMatch(match)}
                      disabled={claiming}
                      className="w-full flex items-center gap-4 p-3 bg-white rounded-[20px] mb-3 shadow-sm border border-gray-100 hover:border-primary/30 transition-colors disabled:opacity-50 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0">
                        {match.photo ? (
                          <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-400">
                            {match.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="flex-1 text-[16px] font-bold text-gray-900">{match.name}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <Coffee size={14} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500 text-sm font-medium">You don't have any matches yet.</p>
                    <button 
                      onClick={() => { setClaimModalVisible(false); navigate('/live'); }}
                      className="mt-4 text-primary font-bold hover:underline"
                    >
                      Go to Live Matching
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <button 
                  onClick={() => setClaimModalVisible(false)}
                  disabled={claiming}
                  className="w-full py-3.5 text-[15px] font-bold text-gray-500 hover:text-gray-900 transition-colors rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
