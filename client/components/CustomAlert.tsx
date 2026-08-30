import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, XCircle, AlertTriangle, HelpCircle, Sparkles } from 'lucide-react';

export type AlertType = 'info' | 'success' | 'error' | 'warning' | 'confirm' | 'coming_soon';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  type?: AlertType;
  buttons?: AlertButton[];
  onClose: () => void;
}

const ICONS: Record<AlertType, { icon: any; iconColor: string; gradientClass: string }> = {
  info: { icon: Info, iconColor: 'text-white', gradientClass: 'from-indigo-500 to-violet-500' },
  success: { icon: CheckCircle, iconColor: 'text-white', gradientClass: 'from-emerald-500 to-emerald-400' },
  error: { icon: XCircle, iconColor: 'text-white', gradientClass: 'from-red-500 to-red-400' },
  warning: { icon: AlertTriangle, iconColor: 'text-white', gradientClass: 'from-amber-500 to-amber-400' },
  confirm: { icon: HelpCircle, iconColor: 'text-white', gradientClass: 'from-indigo-500 to-violet-500' },
  coming_soon: { icon: Sparkles, iconColor: 'text-white', gradientClass: 'from-[#A7B8E6] to-[#8BA3DB]' },
};

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type = 'info',
  buttons = [{ text: 'OK', style: 'default' }],
  onClose,
}) => {
  const { icon: Icon, iconColor, gradientClass } = ICONS[type];
  const isComingSoon = type === 'coming_soon';

  // Lock body scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-[100] flex justify-center items-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-[24px] w-full max-w-[340px] p-7 flex flex-col items-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isComingSoon && (
                <>
                  <div className="absolute top-5 right-8 w-2 h-2 rounded-full bg-amber-500 opacity-80" />
                  <div className="absolute top-10 left-6 w-1.5 h-1.5 rounded-full bg-pink-500 opacity-70" />
                  <div className="absolute bottom-16 right-10 w-1 h-1 rounded-full bg-violet-500 opacity-60" />
                </>
              )}

              <div className="mb-5 relative">
                <div className={`w-[72px] h-[72px] rounded-full flex justify-center items-center bg-gradient-to-br ${gradientClass}`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                {isComingSoon && (
                  <div className="absolute -inset-2 rounded-full border-2 border-[#9B4DCA]/30" />
                )}
              </div>

              <h2 className="text-[22px] font-extrabold text-[#1A1A1A] text-center tracking-tight mb-2.5">
                {title}
              </h2>
              {message && (
                <p className="text-[15px] text-[#666666] text-center leading-[22px] mb-6 px-2">
                  {message}
                </p>
              )}

              <div className={`w-full flex gap-3 mt-1 ${buttons.length === 1 ? 'justify-center' : 'flex-row'}`}>
                {buttons.map((button, index) => {
                  const isDestructive = button.style === 'destructive';
                  const isCancel = button.style === 'cancel';
                  const isPrimary = !isDestructive && !isCancel;

                  if (isPrimary && isComingSoon) {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          button.onPress?.();
                          onClose();
                        }}
                        className="w-full rounded-2xl bg-gradient-to-r from-[#A7B8E6] to-[#8BA3DB] py-4 flex items-center justify-center transition-transform active:scale-95"
                      >
                        <span className="text-white text-base font-bold tracking-wide">{button.text}</span>
                      </button>
                    );
                  }

                  let buttonClasses = "flex-1 rounded-2xl py-4 flex items-center justify-center transition-transform active:scale-95 ";
                  if (buttons.length === 1) buttonClasses = "w-full rounded-2xl py-4 flex items-center justify-center transition-transform active:scale-95 ";
                  
                  if (isPrimary) {
                    buttonClasses += "bg-[#1A1A1A] text-white";
                  } else if (isCancel) {
                    buttonClasses += "bg-[#F5F5F5] border-[1.5px] border-[#E8E8E8] text-[#666666]";
                  } else if (isDestructive) {
                    buttonClasses += "bg-red-100 text-red-500";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        button.onPress?.();
                        onClose();
                      }}
                      className={buttonClasses}
                    >
                      <span className="text-[15px] font-semibold">{button.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for easier usage
interface AlertConfig {
  title: string;
  message?: string;
  type?: AlertType;
  buttons?: AlertButton[];
}

export const useCustomAlert = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<AlertConfig>({ title: '' });

  const showAlert = useCallback((
    title: string,
    message?: string,
    buttons?: AlertButton[],
    type?: AlertType
  ) => {
    setConfig({ title, message, buttons, type });
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
  }, []);

  const AlertComponent = () => (
    <CustomAlert
      visible={visible}
      title={config.title}
      message={config.message}
      type={config.type}
      buttons={config.buttons}
      onClose={hideAlert}
    />
  );

  return { showAlert, hideAlert, AlertComponent };
};
