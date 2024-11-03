import React from "react";
import HeartAnimation from "../components/HeartAnimation";
import { useFireworks } from "../contexts/ConditionContext";

const FireworksPage: React.FC = () => {
  const { isOpenFireworks } = useFireworks();
  return (
    <div className="fireworks-container vignette-2">
      <div className="heart-animation">
        <HeartAnimation fireworks={isOpenFireworks} />
      </div>
    </div>
  );
};

export default FireworksPage;
