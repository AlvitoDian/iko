import React, { useState, useEffect } from "react";
import LoadingScreen from "./pages/LoadingScreen";
import Home from "./pages/Home";
import FireworksPage from "./pages/FireworksPage";
import { useFireworks } from "./contexts/ConditionContext";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpenFireworks } = useFireworks();
  console.log(isOpenFireworks, "asdas");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-comic">
      <LoadingScreen isLoading={isLoading} />
      <FireworksPage />
      <Home />
    </div>
  );
};

export default App;
