import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCcw, CheckCircle2, AlertCircle, Sun, Video as VideoIcon, StopCircle } from "lucide-react";

interface VideoRecorderProps {
  onVideoRecorded: (file: File) => void;
  onCancel: () => void;
  minDuration?: number;
  maxDuration?: number;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  onVideoRecorded,
  onCancel,
  minDuration = 3,
  maxDuration = 10,
}) => {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Request permissions on mount
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: true })
      .then((stream) => {
        setPermissionGranted(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Permission denied:", err);
        setPermissionGranted(false);
      });

    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const startRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    chunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
        videoRef.current.loop = true;
        videoRef.current.play();
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(100); // collect data chunks every 100ms
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= maxDuration - 1) {
          stopRecording();
          return maxDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleRetake = () => {
    setRecordedBlob(null);
    setRecordingTime(0);
    // Restart camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.src = "";
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true; // mute during preview
          videoRef.current.play();
        }
      })
      .catch(console.error);
  };

  const handleConfirm = () => {
    if (recordedBlob) {
      const file = new File([recordedBlob], "verification.webm", { type: "video/webm" });
      onVideoRecorded(file);
    }
  };

  if (permissionGranted === false) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center w-full bg-white rounded-3xl border border-[#E0E0E0] shadow-sm">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Camera Access Required</h3>
        <p className="text-[#6B6B6B] mb-6">Please enable camera and microphone access to record your verification video.</p>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-white border border-[#E0E0E0] text-[#1A1A1A] font-semibold rounded-xl hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full w-full">
      <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden mb-6 shadow-xl border border-[rgba(255,255,255,0.1)]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!recordedBlob} // Mute while recording, unmute on playback
          className="w-full h-full object-cover"
        />

        {/* Professional Header */}
        {!recordedBlob && (
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex flex-col items-center z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-2">
              <Sun size={16} className="text-[#FFD700]" />
              <span className="text-white text-sm font-semibold tracking-wide uppercase">Face Verification</span>
            </div>
            <span className="text-white/90 text-[15px] font-medium text-center drop-shadow-md">
              {isRecording ? "Move your face left to right" : "Ensure proper lighting and tap to record"}
            </span>
          </div>
        )}

        {/* Face guide frame */}
        {!recordedBlob && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-12">
            <div className={`w-full h-[60%] border-2 rounded-[100px] transition-all duration-300 ${isRecording ? 'border-[#FFD700]/80' : 'border-white/50 border-dashed'}`} />
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-6 right-6 z-20 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-red-500/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-red-500/50"
            >
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <span className="text-white font-mono text-sm font-bold">
                {recordingTime.toFixed(1)}s
              </span>
            </motion.div>
          </div>
        )}

        {/* Playback Controls */}
        {recordedBlob && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6 z-20">
            <button
              onClick={handleRetake}
              className="flex-1 flex justify-center items-center gap-2 py-3.5 bg-black/40 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-xl hover:bg-black/60 transition-colors"
            >
              <RefreshCcw size={18} /> Retake
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex justify-center items-center gap-2 py-3.5 bg-[#1F1F1F] border border-white/20 text-white font-semibold rounded-xl hover:bg-[#2D2D2D] transition-colors shadow-lg"
            >
              <CheckCircle2 size={18} /> Confirm
            </button>
          </div>
        )}

        {/* Record Button */}
        {!recordedBlob && (
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 z-20">
            <button
              onClick={onCancel}
              disabled={isRecording}
              className={`text-white font-semibold px-4 py-2 ${isRecording ? 'opacity-50' : 'opacity-100 hover:text-gray-300'}`}
            >
              Cancel
            </button>
            <div className="flex-1 flex justify-center -ml-6">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="w-20 h-20 bg-white/10 backdrop-blur-md border-[3px] border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-95"
                >
                  <div className="w-8 h-8 bg-red-500 rounded-lg shadow-inner" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="w-20 h-20 bg-white/10 backdrop-blur-md border-[3px] border-white/50 rounded-full flex items-center justify-center p-2 transition-transform active:scale-95 hover:bg-white/20"
                >
                  <div className="w-full h-full bg-[#1F1F1F] rounded-full flex items-center justify-center shadow-lg">
                    <VideoIcon size={28} className="text-white" />
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
