import React from 'react';
import { User } from 'lucide-react';

interface StoryRingProps {
  profilePhoto?: string | null;
  hasActiveStory?: boolean;
  hasUnseenStory?: boolean;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export const StoryRing: React.FC<StoryRingProps> = ({
  profilePhoto,
  hasActiveStory = false,
  hasUnseenStory = true,
  size = 60,
  onPress,
  disabled = false,
  className = '',
}) => {
  const ringWidth = 3;
  const gapWidth = 2;
  const imageSize = size - (ringWidth + gapWidth) * 2;

  const renderContent = () => {
    if (hasActiveStory) {
      if (hasUnseenStory) {
        return (
          <div
            className="flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#FF8E53] to-[#FFC93C]"
            style={{ width: size, height: size, padding: ringWidth }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-white"
              style={{ width: size - ringWidth * 2, height: size - ringWidth * 2, padding: gapWidth }}
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-full object-cover"
                  style={{ width: imageSize, height: imageSize }}
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-full bg-gray-100"
                  style={{ width: imageSize, height: imageSize }}
                >
                  <User size={imageSize * 0.5} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="flex items-center justify-center rounded-full bg-gray-300"
            style={{ width: size, height: size, padding: ringWidth }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-white"
              style={{ width: size - ringWidth * 2, height: size - ringWidth * 2, padding: gapWidth }}
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-full object-cover"
                  style={{ width: imageSize, height: imageSize }}
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-full bg-gray-100"
                  style={{ width: imageSize, height: imageSize }}
                >
                  <User size={imageSize * 0.5} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{ width: size, height: size }} className="flex items-center justify-center">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt="Profile"
            className="rounded-full object-cover"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full bg-gray-100"
            style={{ width: size, height: size }}
          >
            <User size={size * 0.5} className="text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  if (onPress && !disabled) {
    return (
      <button
        onClick={onPress}
        disabled={disabled}
        className={`focus:outline-none transition-transform active:scale-95 ${className}`}
      >
        {renderContent()}
      </button>
    );
  }

  return <div className={className}>{renderContent()}</div>;
};

export default StoryRing;
