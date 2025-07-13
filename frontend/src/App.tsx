import USAMap from "./USAMap";
import StatePopupCard from "./StatePopupCard";
import { useState, useEffect } from "react";
import { stateIdToName } from "./utils/stateIdToName";

const stateFormData: Record<string, any> = {
  California: {
    year: 2024,
    presidential: 1,
    bachelorsPercent: 35,
    averageIncome: 75000,
    whitePercent: 36,
    averageAge: 37.5,
  },
  Texas: {
    year: 2024,
    presidential: 1,
    bachelorsPercent: 30,
    averageIncome: 65000,
    whitePercent: 41,
    averageAge: 35.2,
  },
};

const getStateDemographics = (stateId: string): any => {
  return stateFormData[stateIdToName[stateId]];
};

function App() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    year: 2024,
    presidential: 1,
    bachelorsPercent: 30,
    averageIncome: 60000,
    whitePercent: 50,
    averageAge: 38.5,
  });
  const [prediction, setPrediction] = useState(0);

  useEffect(() => {
    setPrediction(0);
  }, [formData]);

  const handleStateClick = (stateId: string) => {
    setSelectedState(stateId);
    if (getStateDemographics(stateId)) {
      setFormData(getStateDemographics(stateId));
    } else {
      setFormData({
        year: 2024,
        presidential: 1,
        bachelorsPercent: 30,
        averageIncome: 60000,
        whitePercent: 50,
        averageAge: 38.5,
      });
    }
  };

  const handleCloseCard = () => {
    setSelectedState(null);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc]">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
        <div className="flex items-center gap-4 text-[#111418]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_535)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_535">
                  <rect width="48" height="48" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
            ElectAI
          </h2>
        </div>
      </header>
      {/* Layout fix: add left margin to map when popup is open */}
      <div className="relative min-h-[calc(100vh-56px)]">
        {selectedState && (
          <StatePopupCard
            state={stateIdToName[selectedState]}
            formData={formData}
            setFormData={setFormData}
            prediction={prediction}
            setPrediction={setPrediction}
            onClose={handleCloseCard}
          />
        )}
        <main
          className={`transition-all min-h-[calc(100vh-56px)] duration-300 flex-1 flex items-centerjustify-center ${
            selectedState ? "ml-[400px]" : ""
          }`}
        >
          <div className="w-full max-w-5xl mx-auto">
            <USAMap
              onStateClick={handleStateClick}
              selectedState={selectedState}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
