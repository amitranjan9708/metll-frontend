import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";

export const PlatformGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAndroid, setIsAndroid] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Detect Android via userAgent
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    } else {
      setIsAndroid(false);
    }
  }, []);

  if (isAndroid === null) return null; // Loading state before determining OS

  // Always allow the landing page / marketing pages on Android
  const allowedRoutes = ["/", "/index.html", "/about", "/contact", "/careers", "/privacy", "/deletion", "/safety-standards", "/blog"];
  if (allowedRoutes.includes(location.pathname) || location.pathname.startsWith("/blog/")) {
    return <>{children}</>;
  }

  if (isAndroid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full flex flex-col items-center">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <Smartphone className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Get the Native App
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            MetLL provides a much better experience on Android through our dedicated native application. Please download it from the Play Store to continue.
          </p>

          <Button 
            className="w-full h-14 text-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            onClick={() => window.location.href = "https://play.google.com/store/apps/details?id=com.metll.app"}
          >
            <Download className="w-5 h-5" />
            Download on Google Play
          </Button>
        </div>
      </div>
    );
  }

  // If iOS, Desktop, etc., render the normal React application
  return <>{children}</>;
};
