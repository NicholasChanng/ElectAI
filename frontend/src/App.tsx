import { useState, useEffect } from "react";
import axios from "axios";

function App() {
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

  const handleYearBlur = (value: number) => {
    let year = Math.round(value);

    // Clamp the year within [1980, 2060]
    year = Math.min(Math.max(year, 1980), 2060);

    // Ensure even number (round up if odd)
    if (year % 2 !== 0) year += 1;

    setFormData((prev) => ({ ...prev, year }));

    // Determine if it's a presidential election year
    setFormData((prev) => ({ ...prev, presidential: year % 4 === 0 ? 1 : 0 }));
  };

  const handleYearChange = (value: number) => {
    setFormData((prev) => ({ ...prev, year: value ? value : 0 }));
  };

  const handlePercentageChange = (field: string, value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    setFormData((prev) => ({ ...prev, [field]: clampedValue }));
  };

  const handleIncomeBlur = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 20000), 100000);
    setFormData((prev) => ({ ...prev, averageIncome: clampedValue }));
  };

  const handleIncomeChange = (value: number) => {
    // Update formData without clamping, allowing user input
    setFormData((prev) => ({
      ...prev,
      averageIncome: value ? value : 0,
    }));
  };

  const handleAgeChange = (value: number) => {
    // Update the value as the user types without clamping
    setFormData((prev) => ({
      ...prev,
      averageAge: value ? value : 1,
    }));
  };

  const handleAgeBlur = (value: number) => {
    // Clamp the value between 18 and 45 after the user finishes typing
    const age = Math.min(Math.max(value, 18), 45); // Clamp to [18, 45]
    setFormData((prev) => ({
      ...prev,
      averageAge: age,
    }));
  };

  const sendData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/predict",
        formData
      );
      console.log("Response:", response.data.prediction);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
        <div className="flex items-center gap-4 text-[#111418]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_535)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            What percent of a State's population is likely to vote?
          </h1>
          <p className="text-gray-600">
            Given these metrics, find out what percent of eligible voters
            actually go out and vote on Election Day!
          </p>
        </div>

        <form className="space-y-6">
          {/* Year Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Election Year
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="1980"
                  max="2060"
                  step="2"
                  value={formData.year || 1980} // Default to 1980 if empty
                  onChange={(e) => handleYearBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.year || ""}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                onBlur={(e) => handleYearBlur(parseInt(e.target.value))}
                className="w-24 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>

          {/* Bachelor's Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Percentage with Bachelor's Degree or higher
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.bachelorsPercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "bachelorsPercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.bachelorsPercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "bachelorsPercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
          </div>

          {/* Average Income */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Income
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="20000"
                  max="100000"
                  step="1000"
                  value={formData.averageIncome || 20000}
                  onChange={(e) => handleIncomeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">$</span>
                <input
                  type="number"
                  value={formData.averageIncome || ""}
                  onChange={(e) => handleIncomeChange(parseInt(e.target.value))}
                  onBlur={(e) => handleIncomeBlur(parseInt(e.target.value))}
                  className="w-24 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
              </div>
            </div>
          </div>

          {/* White Percentage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              White Population Percentage
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.whitePercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "whitePercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.whitePercent}
                  onChange={(e) =>
                    handlePercentageChange(
                      "whitePercent",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
          </div>

          {/* Average Age */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Age
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-grow">
                <input
                  type="range"
                  min="18"
                  max="45"
                  step="1"
                  value={formData.averageAge || 18} // Default to 18 if empty
                  onChange={(e) => handleAgeBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <input
                type="number"
                value={formData.averageAge || ""}
                onChange={(e) => handleAgeChange(parseFloat(e.target.value))}
                onBlur={(e) => handleAgeBlur(parseFloat(e.target.value))}
                className="w-20 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-3 px-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              onClick={() =>
                setFormData({
                  year: 2024,
                  presidential: 1,
                  bachelorsPercent: 30,
                  averageIncome: 60000,
                  whitePercent: 50,
                  averageAge: 38.5,
                })
              }
            >
              Reset
            </button>
            <button
              type="button"
              className="flex-1 py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={sendData}
            >
              Predict
            </button>
          </div>
        </form>

        {prediction === 0 ? (
          ""
        ) : (
          <>
            {" "}
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Prediction
            </h3>
            <div className="flex flex-wrap">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f4]">
                {/* <p className="text-[#111418] text-base font-medium leading-normal">
              50%
            </p> */}
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  {prediction === 0 ? "" : prediction.toFixed(3) + "%"}
                </p>
                {/* <p className="text-[#078838] text-base font-medium leading-normal">
              +0%
            </p> */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
