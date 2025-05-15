import React, { useEffect, useState } from 'react';

interface WaveformBarProps {
  index: number;
  progress: number;
  isActive: boolean;
}

export const WaveformBar: React.FC<WaveformBarProps> = ({ index, progress, isActive }) => {
  const [height, setHeight] = useState<string>('40%');

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = `${Math.max(15, Math.sin((Date.now() / (600 + index * 50)) % Math.PI) * 60 + 40)}%`;
      setHeight(newHeight);
      requestAnimationFrame(updateHeight);
    };

    const animationId = requestAnimationFrame(updateHeight);
    return () => cancelAnimationFrame(animationId);
  }, [index]);

  return (
    <div
      className="bg-primary h-full w-1 rounded-full opacity-70"
      style={{
        height,
        animation: `pulse 1.5s ease-in-out ${index * 0.1}s infinite`,
        opacity: isActive ? '1' : '0.2',
      }}
    />
  );
};
