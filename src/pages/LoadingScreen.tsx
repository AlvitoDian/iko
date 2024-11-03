import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsHidden(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center justify-center loading-screen ${
        !isLoading ? "fade-out" : ""
      } ${isHidden ? "hidden" : ""}`}
    >
      <div className="flex flex-col gap-[8px] justify-center items-center">
        <div className="w-[150px]">
          <img src="/catloading.gif" alt="" />
        </div>
        <div className="w-full bg-[#bbbdbc] rounded-full h-2.5">
          <div
            className="bg-[#273C34] h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-[#273C34] font-semibold text-[13px] py-[4px]">
          {progress}%
        </div>
        <div className="text-[#273C34] font-semibold">Bentar yaaa...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
