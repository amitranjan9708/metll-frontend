import React, { useEffect, useState } from 'react';
import { ShieldAlert, ExternalLink, Smartphone } from 'lucide-react';

interface BrowserGateProps {
    children: React.ReactNode;
}

export const BrowserGate: React.FC<BrowserGateProps> = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(true);
    const [isIosSafari, setIsIosSafari] = useState(false);

    useEffect(() => {
        const checkBrowser = () => {
            // Bypass restriction unless explicitly enabled via ENV
            if (import.meta.env.VITE_ENABLE_BROWSER_GATE !== 'true') {
                return;
            }

            const userAgent = window.navigator.userAgent.toLowerCase();
            const vendor = window.navigator.vendor ? window.navigator.vendor.toLowerCase() : '';

            // Detect iOS Safari
            const isIOS = /ipad|iphone|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
            const isSafari = /safari/.test(userAgent) && !/chrome|crios|crmo/.test(userAgent);
            
            if (isIOS && isSafari) {
                setIsIosSafari(true);
                setIsAllowed(false);
                return;
            }

            // Detect Chrome (including Android Chrome)
            const isChrome = /chrome|crios/.test(userAgent);
            const isEdge = /edg/.test(userAgent);
            const isOpera = /opr/.test(userAgent);
            const isBrave = (navigator as any).brave !== undefined;
            const isFirefox = /firefox/.test(userAgent);

            // We only allow Chrome (not Edge, not Opera, not Firefox)
            if (!isChrome || isEdge || isOpera || isBrave || isFirefox) {
                setIsAllowed(false);
            }
        };

        checkBrowser();
    }, []);

    const openInChrome = () => {
        // iOS Deep link to Chrome
        const currentUrl = window.location.href;
        const chromeUrl = currentUrl.replace(/^https?:\/\//i, 'googlechrome://');
        window.location.href = chromeUrl;
    };

    if (isAllowed) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-[#FCE8E8] rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert size={32} className="text-[#E74C3C]" />
                </div>
                
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    Browser Not Supported
                </h1>
                
                <p className="text-[#5A5A6A] mb-8 leading-relaxed">
                    To ensure the highest level of security and to prevent referral fraud, MetLL is only accessible via <b>Google Chrome</b>.
                </p>

                {isIosSafari ? (
                    <button 
                        onClick={openInChrome}
                        className="w-full bg-[#7A96D4] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5A70B8] transition-colors shadow-md"
                    >
                        <ExternalLink size={20} />
                        Open in Chrome
                    </button>
                ) : (
                    <div className="bg-[#E8EEF8] p-4 rounded-xl flex items-start gap-3 w-full text-left">
                        <Smartphone size={24} className="text-[#7A96D4] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-[#5A5A6A]">
                            Please open this link in the <b>Google Chrome</b> browser to continue using MetLL.
                        </p>
                    </div>
                )}
                
                <div className="mt-8 text-left w-full">
                    <p className="text-[10px] text-[#9B9BAA] break-all">
                        <b>Debug Info:</b><br/>
                        UA: {window.navigator.userAgent}<br/>
                        Vendor: {window.navigator.vendor}
                    </p>
                </div>
            </div>
        </div>
    );
};
