import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, MessageCircleHeart, Sparkles } from "lucide-react";

const SITUATIONS = [
  { id: 1, text: "You accidentally spill coffee on a stranger's laptop at a cafe. They are surprisingly chill about it. What's your next move?" },
  { id: 2, text: "Your crush is presenting in a meeting and has spinach in their teeth. How do you tell them?" },
  { id: 3, text: "You're at a party where you don't know anyone except the host, who is busy. How do you start a conversation?" },
  { id: 4, text: "The zombie apocalypse just started. You have 10 minutes to pack. What are the top 3 things you grab?" },
  { id: 5, text: "Describe your perfect lazy Sunday." },
];

type Step = "intro" | "select" | "answer";

export default function Situations() {
  const navigate = useNavigate();
  const { updateUser, completeOnboarding } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("intro");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // State for answers
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      const situationResponses = selectedIds.map(id => ({
        questionId: id,
        answer: answers[id] || "",
        answeredAt: new Date().toISOString()
      }));

      // Update backend via context
      updateUser({ situationResponses }, false);
      
      // Mark onboarding as fully complete
      await completeOnboarding();
      
      toast({ title: "Welcome!", description: "Your profile is all set up." });
      navigate("/home");
    } catch (error) {
      toast({ title: "Error", description: "Failed to save answers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerNext = () => {
    const currentId = selectedIds[currentAnswerIndex];
    if (!answers[currentId] || answers[currentId].trim().length < 10) {
      toast({ title: "Too short", description: "Please write a slightly longer answer.", variant: "destructive" });
      return;
    }

    if (currentAnswerIndex < selectedIds.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
    } else {
      submitAnswers();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 p-4">
      <div className="max-w-md w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6">
                <MessageCircleHeart className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Break the Ice</h1>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Profiles with fun answers get 3x more matches. Pick 2 situations and show off your personality!
              </p>
              <Button onClick={() => setStep("select")} className="w-full h-12 text-base font-medium">
                Let's Go <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 mb-2">Pick 2 Situations</h1>
              <p className="text-gray-500 text-sm mb-6">Select the ones you have the best answers for ({selectedIds.length}/2)</p>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 pb-4">
                {SITUATIONS.map((sit) => {
                  const isSelected = selectedIds.includes(sit.id);
                  const isDisabled = !isSelected && selectedIds.length >= 2;
                  
                  return (
                    <div 
                      key={sit.id}
                      onClick={() => !isDisabled && handleSelect(sit.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected ? "border-primary bg-primary/5 text-primary" : 
                        isDisabled ? "border-gray-100 opacity-50 bg-gray-50 cursor-not-allowed" : 
                        "border-gray-200 hover:border-primary/50 text-gray-700"
                      }`}
                    >
                      <p className="font-medium text-sm leading-relaxed">{sit.text}</p>
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Button 
                  onClick={() => setStep("answer")} 
                  disabled={selectedIds.length !== 2} 
                  className="w-full h-12"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "answer" && (
            <motion.div key="answer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="flex gap-2 mb-6">
                {selectedIds.map((_, idx) => (
                  <div key={idx} className={`flex-1 h-1.5 rounded-full ${idx <= currentAnswerIndex ? "bg-primary" : "bg-gray-200"}`} />
                ))}
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-2">Your Answer</h1>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-gray-700 font-medium text-sm leading-relaxed">
                  {SITUATIONS.find(s => s.id === selectedIds[currentAnswerIndex])?.text}
                </p>
              </div>

              <textarea
                value={answers[selectedIds[currentAnswerIndex]] || ""}
                onChange={(e) => setAnswers({ ...answers, [selectedIds[currentAnswerIndex]]: e.target.value })}
                placeholder="Type your clever answer here..."
                className="w-full flex-1 p-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none outline-none text-gray-800"
              />

              <div className="pt-6 mt-auto">
                <Button 
                  onClick={handleAnswerNext} 
                  disabled={loading}
                  className="w-full h-12"
                >
                  {loading ? "Saving..." : currentAnswerIndex === selectedIds.length - 1 ? (
                    <><Sparkles className="w-4 h-4 mr-2" /> Complete Profile</>
                  ) : (
                    <>Next Question <ChevronRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
