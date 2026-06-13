import React, { useState, useEffect } from "react";
import { Heart, Send, Sparkles, X, MessageCircle, Lock, Ghost, ShieldCheck } from "lucide-react";

interface MatchCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  yourName: string;
  crushName: string;
  location: string;
  memory: string;
}

export default function MatchCelebration({
  isOpen,
  onClose,
  yourName,
  crushName,
  location,
  memory,
}: MatchCelebrationProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [messagesSent, setMessagesSent] = useState<string[]>([]);
  const [revealRequested, setRevealRequested] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setChatMessage("");
      setMessagesSent([]);
      setRevealRequested(false);
      setRevealed(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setMessagesSent([...messagesSent, chatMessage.trim()]);
      setChatMessage("");
    }
  };

  const triggerReveal = () => {
    setRevealRequested(true);
    setTimeout(() => {
      setRevealed(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-md">
      {/* Decorative Floating Sparkles (Fixed to viewport) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#5A6FA3]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#A4B8E7]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="min-h-full w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-3xl w-full max-w-2xl rounded-[32px] border border-white/20 p-6 sm:p-8 mt-4 relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
        
        {/* Header Badge */}
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#5A6FA3]/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-[11px] font-sans font-bold text-white uppercase tracking-widest shadow-lg">
          Mutual Spark Detected
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl border border-white/20 bg-white/5 text-white/70 hover:bg-white/20 hover:text-white active:scale-95 transition-all z-10 cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Match Title */}
        <div className="text-center pt-2 mb-8 relative z-10">
          <div className="w-12 h-12 bg-[#A4B8E7]/10 border border-[#A4B8E7]/20 rounded-xl flex items-center justify-center text-[#A4B8E7] mx-auto animate-bounce mb-3 shadow-lg">
            <Heart className="w-6 h-6 fill-[#A4B8E7]/20 text-[#A4B8E7]" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase" style={{ fontFamily: "'Novaklasse', sans-serif" }}>
            It's a Mutual Match!
          </h2>
          <p className="text-xs text-white/70 mt-1.5 font-sans">
            You both confessed about each other nearby!
          </p>
        </div>

        {/* Polaroid Cards Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-xl text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/30 shadow-xl">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>

          {/* Polaroid Left (Confessor) */}
          <div className="bg-white/5 backdrop-blur-md p-4 pb-6 rounded-2xl shadow-lg border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-square bg-black/20 rounded-xl mb-4 flex flex-col items-center justify-center p-3 text-center border border-white/5 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg border border-white/20 bg-[#5A6FA3]/50 text-white font-sans text-[8px] font-bold">
                CONFESSOR
              </div>
              <Ghost className="w-8 h-8 text-white/80 mb-2" strokeWidth={1.5} />
              <span className="text-xs font-sans text-white font-bold max-w-[150px] truncate uppercase bg-black/40 border border-white/10 px-2 py-0.5 rounded-md">
                {yourName || "Anonymous Spark"}
              </span>
              <p className="text-[10px] text-white/80 font-medium mt-2.5 italic line-clamp-3">
                "{memory}"
              </p>
            </div>
            <div className="text-center mt-2">
              <span className="font-sans font-bold text-[#A4B8E7] uppercase text-sm block">
                First Confession
              </span>
              <p className="text-[9px] font-sans text-white/50">Status: Hidden & Encrypted</p>
            </div>
          </div>

          {/* Polaroid Right (Crush) */}
          <div className="bg-white/5 backdrop-blur-md p-4 pb-6 rounded-2xl shadow-lg border border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="aspect-square bg-[#A4B8E7]/10 rounded-xl mb-4 flex flex-col items-center justify-center p-3 text-center border border-white/5 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg border border-white/20 bg-[#A4B8E7]/50 text-white font-sans text-[8px] font-bold">
                CRUSH MATCH
              </div>
              <Heart className="w-8 h-8 text-[#A4B8E7] fill-[#A4B8E7]/20 mb-2" strokeWidth={1.5} />
              <span className="text-xs font-sans text-white font-bold max-w-[150px] truncate uppercase bg-black/40 border border-white/10 px-2 py-0.5 rounded-md">
                {crushName}
              </span>
              <p className="text-[10px] text-white/90 font-medium mt-2.5 italic">
                "Wait, it matched! Yes, they also submitted theirs at {location}."
              </p>
            </div>
            <div className="text-center mt-2">
              <span className="font-sans font-bold text-emerald-400 uppercase text-sm block">
                Reciprocated!
              </span>
              <p className="text-[9px] font-sans text-white/50">Status: Safe Match Revealed!</p>
            </div>
          </div>
        </div>

        {/* Action Panel for Interactive Demo */}
        <div className="bg-black/20 rounded-2xl border border-white/10 p-5 shadow-inner relative z-10">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#A4B8E7]" strokeWidth={1.5} />
            <span>Interactive Chat Preview (Demo Sandbox)</span>
          </h3>

          <div className="h-28 overflow-y-auto mb-4 bg-black/40 rounded-xl border border-white/5 p-3 space-y-2 text-xs">
            {messagesSent.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/40 text-center font-medium">
                <Lock className="w-4 h-4 mb-1" strokeWidth={1.5} />
                <p className="text-[10px]">Chat is secure. Send your first anonymous icebreaker!</p>
              </div>
            ) : (
              messagesSent.map((msg, index) => (
                <div key={index} className="flex flex-col items-end">
                  <div className="bg-[#5A6FA3]/40 text-white px-3 py-1.5 rounded-xl max-w-[85%] border border-white/10 font-medium break-words text-left shadow-sm">
                    {msg}
                  </div>
                  <span className="text-[9px] text-white/40 font-medium mt-0.5">Sent anonymously now</span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="e.g. 'Hey, I can't believe you noticed my headphones! Let's get coffee?'"
              className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 focus:outline-none focus:bg-white/10 placeholder-white/40 text-white font-medium shadow-inner transition-colors"
            />
            <button
              type="submit"
              disabled={!chatMessage.trim()}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0"
            >
              <Send className="w-4 h-4 text-white" strokeWidth={1.5} />
            </button>
          </form>

          {/* Reveal details simulator */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-white/70 font-medium">
              <span>Curious who they actually are? Request metadata reveal.</span>
            </div>

            {revealed ? (
              <div className="flex items-center gap-1.5 text-xs text-white font-bold bg-[#5A6FA3]/40 px-3.5 py-2.5 rounded-xl border border-[#A4B8E7]/30 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                <span>Identity: {yourName} 🤍 {crushName}!</span>
              </div>
            ) : revealRequested ? (
              <button
                disabled
                className="bg-white/5 text-white/50 border border-white/10 px-4 py-2 rounded-xl font-bold animate-pulse"
              >
                Connecting server / Decrypting...
              </button>
            ) : (
              <button
                type="button"
                onClick={triggerReveal}
                className="bg-[#A4B8E7]/20 hover:bg-[#A4B8E7]/30 text-white hover:scale-105 px-4 py-2 border border-[#A4B8E7]/30 rounded-full font-bold text-xs transition-all shadow-lg cursor-pointer shrink-0"
              >
                Reveal Mutual Contact Info
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 text-center relative z-10">
          <p className="text-[10px] text-white/40 font-sans font-medium">
            🔒 All real metadata on MetLL is end-to-end encrypted. No third parties can audit your crushes.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
