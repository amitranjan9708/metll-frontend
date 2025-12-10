import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
}

export function SuccessDialog({ open, onOpenChange, name }: SuccessDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-2 border-[#4A5E96] bg-white p-8 rounded-2xl shadow-2xl">
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: "50%",
                    y: "50%",
                    rotate: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    rotate: 360,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#4A5E96]" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <DialogHeader className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="mx-auto"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <CheckCircle2 className="w-20 h-20 text-[#4A5E96] mx-auto" fill="#4A5E96" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-[#4A5E96]/20"
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <DialogTitle
              className="text-3xl font-bold text-[#311717]"
              style={{ fontFamily: "'Novaklasse', sans-serif" }}
            >
              You're In! 🎉
            </DialogTitle>
            <DialogDescription className="text-base text-[#311717]/70 pt-2">
              {name ? (
                <>
                  Welcome to the waitlist, <strong className="text-[#4A5E96]">{name}</strong>!
                </>
              ) : (
                "Welcome to the waitlist!"
              )}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center space-y-4"
        >
          <p className="text-sm text-[#311717]/60" style={{ fontFamily: "Narnoor, Georgia, serif" }}>
            We'll notify you as soon as we launch. Get ready for something amazing!
          </p>
          <motion.button
            onClick={() => onOpenChange(false)}
            className="w-full py-3 px-6 rounded-full font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{
              backgroundColor: "#4A5E96",
              fontFamily: "'Novaklasse', sans-serif",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Awesome!
          </motion.button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}


