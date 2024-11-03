import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import conversationsData from "../data/conversation.json";
import { useFireworks } from "../contexts/ConditionContext";

const ChatSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentConversation = conversationsData.conversations[currentIndex];
  const { toggleFireworks } = useFireworks();

  const handleNext = () => {
    //? Additional Conditional
    if (currentIndex === 5) {
      toggleFireworks();
    } else if (currentIndex === 6) {
      setCurrentIndex(8);
    }

    if (currentIndex < conversationsData.conversations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 5) {
      setCurrentIndex(6);
    } else if (currentIndex === 6) {
      setCurrentIndex(4);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [currentIndex]);

  return (
    <div className="bg-[#B7E0FF] animated-pop-fade rounded-[8px] p-[10px] min-w-[453px] max-w-[50vw]">
      <div className="flex gap-[13px]">
        <div className="w-[120px]">
          <img src={currentConversation.characterImage} alt="Character" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="bg-white rounded-[8px] p-[9px] w-[300px] min-h-[42px]">
            <TypeAnimation
              key={animationKey}
              sequence={[currentConversation.dialog, 1000]}
              speed={50}
              repeat={0}
              cursor={false}
            />
          </div>
          <div className="flex justify-end gap-[13px]">
            {currentIndex === 7 ? null : (
              <>
                {currentIndex === 5 || currentIndex === 6 ? (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="bg-white px-[10px] py-[0px] rounded-[8px]"
                    >
                      Nggak
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-white px-[10px] py-[0px] rounded-[8px] border-solid border-2 border-[#98c9ee]"
                    >
                      Iya
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-white px-[10px] py-[0px] rounded-[8px] border-solid border-2 border-[#98c9ee]"
                  >
                    Lanjut
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
