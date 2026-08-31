import React, { useState, useEffect, useRef } from 'react';

interface MascotMediaProps {
  videoSrc?: string;
  imageSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MascotMedia: React.FC<MascotMediaProps> = ({
  videoSrc,
  imageSrc,
  alt,
  className = '',
  style,
}) => {
  const [useImage, setUseImage] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect iOS devices (iPhone, iPad, iPod) - iOS WebKit does not support WebM alpha transparency
    // and displays a black background for WebM video elements.
    const isIos =
      typeof navigator !== 'undefined' &&
      /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (isIos || !videoSrc) {
      setUseImage(true);
    }
  }, [videoSrc]);

  useEffect(() => {
    if (!useImage && videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay is blocked or fails, fallback to image
        setUseImage(true);
      });
    }
  }, [useImage]);

  if (useImage) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        style={style}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      onError={() => setUseImage(true)}
      className={className}
      style={style}
    >
      <source src={videoSrc} type="video/webm" />
      <img src={imageSrc} alt={alt} className={className} style={style} />
    </video>
  );
};

export default MascotMedia;
