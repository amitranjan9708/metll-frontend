import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Video, LogOut, Loader2, Camera, ShieldCheck, X, Plus, AlertCircle, AlertTriangle } from "lucide-react";
import { VideoRecorder } from "../components/VideoRecorder";
import { authApi } from "../lib/authApi";
import { userApi } from "../lib/userApi";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function PhotoUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, updateUser, logout } = useAuth();
  
  const [step, setStep] = useState<"photos" | "video">("photos");
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string | null>(location.state?.photo || null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Auto-upload simulation from onboarding
  useEffect(() => {
    if (user?.photo && !localPhotoUrl) {
      setLocalPhotoUrl(user.photo);
    }
  }, [user, localPhotoUrl]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout? Your progress will be lost.")) {
      logout();
      navigate("/register");
    }
  };

  const handlePhotosComplete = () => {
    if (!localPhotoUrl) {
      toast({ title: "Required", description: "Please upload a profile photo", variant: "destructive" });
      return;
    }
    setStep("video");
  };

  const handleVideoRecorded = async (file: File) => {
    setIsUploadingVideo(true);
    setVideoError(null);
    try {
      const result = await authApi.uploadVerificationVideo(file);
      if (result.success) {
        updateUser({ isOnboarded: true, isVerified: true });
        toast({
          title: "Success! 🎉",
          description: "Your profile photo and video have been uploaded successfully. You can now explore the app!",
        });
        navigate("/home");
      } else {
        throw new Error(result.message || "Failed to upload video");
      }
    } catch (error: any) {
      setVideoError(error.message || "An error occurred while uploading");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleSkipVideo = async () => {
    if (window.confirm("You can always verify your profile later. Verified profiles get more matches! Skip for now?")) {
      try {
        await userApi.updateProfile({ isOnboarded: true });
        updateUser({ isOnboarded: true });
      } catch (e) {
        console.error(e);
      }
      navigate("/home");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingPhoto(true);
    setPhotoError(null);
    try {
      // Show local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setLocalPhotoUrl(objectUrl);
      
      const result = await userApi.uploadProfilePicture(file);
      if (result.success && result.data?.profilePhoto) {
        setLocalPhotoUrl(result.data.profilePhoto);
        updateUser({ photo: result.data.profilePhoto });
      } else {
        throw new Error(result.message || "Failed to upload");
      }
    } catch (err: any) {
      setPhotoError(err.message || "Failed to upload photo");
      setLocalPhotoUrl(null);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await authApi.deletePhoto(0);
      setLocalPhotoUrl(null);
      updateUser({ photo: undefined });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-['Inter'] relative">
      <div className="flex-1 overflow-y-auto pt-6 px-6 pb-24 max-w-md mx-auto w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E0E0E0] rounded-lg text-[#6B6B6B] hover:bg-gray-50 transition-colors shadow-sm"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === "photos" ? (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h1 className="text-[24px] font-bold text-[#1A1A1A] mb-2 text-center">Add Your Profile Photo</h1>
              <p className="text-[#6B6B6B] mb-8 text-center text-[14px]">
                This photo will be used as your main profile picture and for identity verification.
              </p>

              <div className="mb-8 relative group">
                <div className={`w-[240px] h-[320px] rounded-2xl bg-white flex items-center justify-center overflow-hidden border-2 ${localPhotoUrl ? (photoError ? 'border-red-500' : 'border-[#1F1F1F]') : 'border-dashed border-[#1F1F1F]'}`}>
                  {localPhotoUrl ? (
                    <>
                      <img src={localPhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                      {isUploadingPhoto && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                          <Loader2 size={32} className="animate-spin mb-2" />
                          <span className="text-sm font-medium">Uploading...</span>
                        </div>
                      )}
                      {!isUploadingPhoto && !photoError && (
                        <>
                          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                            <CheckCircle2 size={20} className="text-white" />
                          </div>
                          <button onClick={handleRemovePhoto} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center shadow-md hover:bg-black/80">
                            <X size={18} className="text-white" />
                          </button>
                          <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                            <ShieldCheck size={18} className="text-white" />
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#1F1F1F]/10 flex items-center justify-center mb-3">
                        <Plus size={24} className="text-[#1F1F1F]" />
                      </div>
                      <span className="text-sm text-[#6B6B6B] font-medium">Tap to add photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>

              {photoError && (
                <div className="w-full bg-red-50 p-4 rounded-xl flex items-start gap-3 mb-6 border border-red-100">
                  <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-600 font-medium">Upload failed: {photoError}</p>
                    <button className="text-sm text-[#1F1F1F] font-semibold mt-1" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>Retry</button>
                  </div>
                </div>
              )}

              <div className="w-full mb-8">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Photo Tips 📸</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span className="text-[14px] text-[#4A4A4A]">Clear face, no sunglasses or filters</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span className="text-[14px] text-[#4A4A4A]">Good lighting and recent photo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span className="text-[14px] text-[#4A4A4A]">Just you in the photo, no group pics</span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white p-4 rounded-xl border border-[#E0E0E0] flex items-center gap-3 mb-6 shadow-sm">
                {localPhotoUrl && !isUploadingPhoto ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#E0E0E0]" />
                )}
                <span className={`text-[14px] font-medium ${localPhotoUrl && !isUploadingPhoto ? 'text-[#1A1A1A]' : 'text-[#6B6B6B]'}`}>
                  Profile photo {localPhotoUrl && !isUploadingPhoto ? 'uploaded' : 'pending'}
                </span>
              </div>

              {localPhotoUrl && !isUploadingPhoto && (
                <div className="w-full flex items-center gap-3 mt-2">
                  <Video size={20} className="text-[#1F1F1F]" />
                  <span className="text-[14px] text-[#1A1A1A] font-medium">Next: Record a quick verification video</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center w-full h-full"
            >
              <div className="w-full flex items-center mb-6">
                <button onClick={() => setStep("photos")} className="p-2 -ml-2" disabled={isUploadingVideo}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1A1A]"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h1 className="text-[20px] font-bold text-[#1A1A1A] flex-1 text-center -ml-8">Verification Video</h1>
              </div>

              <div className="w-full bg-white p-4 rounded-xl border border-[#E0E0E0] flex items-start gap-3 mb-6 shadow-sm">
                <Video size={24} className="text-[#1F1F1F] shrink-0 mt-0.5" />
                <p className="text-[14px] text-[#4A4A4A] leading-relaxed">
                  Record a short video (3-10 seconds) to verify you're a real person.
                </p>
              </div>

              <button
                onClick={handleSkipVideo}
                className="w-full py-4 bg-white border border-[#E0E0E0] rounded-xl mb-6 text-[#4A4A4A] font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                Skip for now
              </button>

              <VideoRecorder
                onVideoRecorded={handleVideoRecorded}
                onCancel={() => setStep("photos")}
                minDuration={3}
                maxDuration={10}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step === "photos" && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E0E0E0] z-10"
          >
            <div className="max-w-md mx-auto w-full">
              <button
                onClick={handlePhotosComplete}
                disabled={!localPhotoUrl || isUploadingPhoto}
                className={`w-full flex items-center justify-center gap-2 h-14 rounded-xl font-bold text-[16px] transition-all active:scale-[0.98] ${
                  localPhotoUrl && !isUploadingPhoto
                    ? 'bg-[#1F1F1F] text-white shadow-md hover:bg-[#2D2D2D]'
                    : 'bg-white border-2 border-[#E0E0E0] text-[#9B9B9B]'
                }`}
              >
                Continue to Video
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isUploadingVideo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl flex flex-col items-center max-w-[280px] w-full shadow-2xl">
            <Loader2 size={40} className="text-[#1F1F1F] animate-spin mb-4" />
            <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-1 text-center">Uploading video...</h3>
            <p className="text-[13px] text-[#6B6B6B] text-center">Please don't close the app</p>
          </div>
        </div>
      )}

      {videoError && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center max-w-[280px] w-full shadow-2xl">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2 text-center">Upload Failed</h3>
            <p className="text-[14px] text-[#6B6B6B] text-center mb-6">{videoError}</p>
            <button onClick={() => document.querySelector('video')?.play() /* trigger re-upload logic actually */} className="w-full py-3 bg-[#1F1F1F] text-white rounded-xl font-semibold mb-3 hover:bg-[#2D2D2D]">
              Retry
            </button>
            <button onClick={() => setVideoError(null)} className="w-full py-3 bg-white border border-[#E0E0E0] text-[#4A4A4A] rounded-xl font-semibold hover:bg-gray-50">
              Record Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
