import React, { useState, useEffect, useRef, MouseEvent } from "react";
import ChatSection from "../components/ChatSection";
import { useFireworks } from "../contexts/ConditionContext";
import music from "../assets/music.mp3";

const Home: React.FC = () => {
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const { isOpenFireworks } = useFireworks();
  const audioRef = useRef<HTMLAudioElement>(new Audio(music));

  const [text, setText] = useState("Iko klik sini....");
  const [image, setImage] = useState("/hai.gif");
  const [isOpenChatSection, setIsOpenChatSection] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const div = event.currentTarget.querySelector(".relative");

    if (div) {
      const rect = div.getBoundingClientRect();
      const distanceX = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const distanceY = Math.abs(event.clientY - (rect.top + rect.height / 2));
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance > 300) {
        setText("Kok menjauh kursornya...");
        setImage("/cry.gif");
      } else {
        setText("Iko klik sini....");
        setImage("/hai.gif");
      }
    }
  };

  const handleClick = () => {
    setIsOpenChatSection(true);
  };

  const handleClose = () => {
    setIsOpenChatSection(false);
  };

  useEffect(() => {
    const audio = audioRef.current;

    // Coba untuk memutar musik secara otomatis saat halaman dimuat
    const playAudioOnLoad = async () => {
      try {
        await audio.play();
        console.log("Music started playing automatically");
      } catch (error) {
        console.log(
          "Auto-play blocked: User interaction is required to play the music"
        );
      }
    };

    playAudioOnLoad();

    // Menghentikan musik dan membersihkan ketika komponen di-unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatSectionRef.current &&
        !chatSectionRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpenChatSection) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenChatSection]);

  return (
    <div
      className={`bg-[#FFCFB3] h-[100vh] flex justify-center items-center vignette transition-transform duration-1000 ${
        isOpenFireworks ? "translate-y-[100vh]" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      <div className="relative inline-block font-medium">
        <div className="w-[120px]">
          <img src={image} alt="" className="w-full h-auto" />
        </div>

        <div
          className="bg-white rounded-[5px] p-[5px] absolute left-[-70px] top-[1px] mx-auto w-fit hover:shadow-[0px_4px_10px_rgba(231,143,129,0.6)] transition-all duration-300 ease-in-out scale-100 hover:scale-[1.1] cursor-pointer text-[14px]"
          onClick={handleClick}
        >
          {text}
        </div>

        {isOpenChatSection && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={chatSectionRef}>
              <ChatSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
