import { useState } from "react";
import WelcomeScreen from "./views/WelcomeScreen";
import GameScreen from "./views/GameScreen";
import SelectLevelScreen from "./views/SelectLevelScreen";
import { ViewType, OnChangeViewFunction } from "./types/onChangeView";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("menu");

  const renderView = (currentView: ViewType) => {
    switch (currentView) {
      case "menu":
        return <WelcomeScreen onButtonClick={handleChangeView} />;
      case "level":
        return <SelectLevelScreen onButtonClick={handleChangeView} />;
      case "game":
        return <GameScreen />;
      default:
        return null;
    }
  };

  const handleChangeView: OnChangeViewFunction = (newView) => {
    setCurrentView(newView);
  };

  return renderView(currentView);
}
